# Credit Union System Design

### High-level domain model

**Actors & org**

    • customers (KYC’d people or entities)
    • branches, users (tellers/ops), roles

**Products**

    • deposit_products (Savings, Share, Recurring Deposit, Fixed Deposit)
    • loan_products (Standard loan, Loan-Against-Deposit)

**Accounts**

    • accounts (one row per deposit or loan account; typed)
    • term_deposits (FD details: principal, tenor, rate, maturity)
    • recurring_deposits (RD details: installment amount/cycle)
    • loan_accounts (approved amount, rate, schedule method)
    • loan_collateral_deposits (lien: loan ↔ deposit accounts)

**Transactions & interest**

    • journal_entries, journal_lines (system of record: double-entry)
    • postings_view (optional SQL view joining lines)
    • interest_accruals, interest_capitalizations (auditable interest)
    • fees / charges (one-off or recurring)
    • schedules (amortization & RD/FD schedules)
    • payments (cash/transfer/adjustment)

**Cash ops**

    • gl_accounts (chart of accounts)
    • vaults, cash_drawers (per branch + teller)
    • cash_transfers (vault↔drawer, drawer↔drawer, CIT)
    • cash_counts (denomination counts for EOD proof)
    • teller_shifts (open/close, variance)

**Principle:** All money movement = journal lines (debits = credits). Product “transactions” are derived from journals by filtering Gls/subledgers.

### MySql Schema

```sql
-- =========================================
-- 1) Branches & Users
-- =========================================
CREATE TABLE branches (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    branch_id BIGINT UNSIGNED NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('TELLER','OPS','MANAGER','ADMIN') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (branch_id) REFERENCES branches(id)
);

CREATE TABLE online_users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  member_id CHAR(36) NOT NULL,  -- FK to members.id
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(150) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  password VARCHAR(255) NOT NULL,
  last_login_at TIMESTAMP NULL,
  status ENUM('ACTIVE','SUSPENDED','CLOSED') DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES members(id)
);
```

```sql
-- =========================================
-- 2) Customers
-- =========================================
CREATE TABLE customers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_no VARCHAR(50) UNIQUE NOT NULL,
    type ENUM('Individual','Organization') NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    registration_no VARCHAR(150),// For organizations
    dob DATE,
    gender ENUM('Male','Female','Other'),
    religion ENUM('Christianity','Islam','Hinduism', 'Buddhism', 'Other'),
    identification_type ENUM('NID','NBR','Passport', 'Driving License'),
    identification_number VARCHAR(50) NOT NULL,
    photo VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(100),
    kyc_level ENUM('MIN','STD','ENH') DEFAULT 'MIN',
    status ENUM('PENDING','ACTIVE','SUSPENDED','CLOSED') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE customer_addresses (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id BIGINT UNSIGNED NOT NULL,
    line1 VARCHAR(255) NOT NULL,
    line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country_code CHAR(2) NOT NULL DEFAULT 'BD',  -- ISO 3166-1 alpha-2
    type ENUM('CURRENT','PERMANENT','MAILING','WORK','REGISTERED','OTHER')
        NOT NULL DEFAULT 'CURRENT',
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- protected $relationMap = [
--     // Parents & Children
--     'Father'        => ['reverse' => ['Son','Daughter']],
--     'Mother'        => ['reverse' => ['Son','Daughter']],
--     'Son'           => ['reverse' => ['Father','Mother']],
--     'Daughter'      => ['reverse' => ['Father','Mother']],

--     // Siblings
--     'Brother'       => ['reverse' => ['Brother','Sister']],
--     'Sister'        => ['reverse' => ['Brother','Sister']],

--     // Spouse
--     'Husband'       => ['reverse' => ['Wife']],
--     'Wife'          => ['reverse' => ['Husband']],

--     // Extended family
--     'Grandfather'   => ['reverse' => ['Grandson','Granddaughter']],
--     'Grandmother'   => ['reverse' => ['Grandson','Granddaughter']],
--     'Grandson'      => ['reverse' => ['Grandfather','Grandmother']],
--     'Granddaughter' => ['reverse' => ['Grandfather','Grandmother']],

--     'Uncle'         => ['reverse' => ['Nephew','Niece']],
--     'Aunt'          => ['reverse' => ['Nephew','Niece']],
--     'Nephew'        => ['reverse' => ['Uncle','Aunt']],
--     'Niece'         => ['reverse' => ['Uncle','Aunt']],

--     // In-laws
--     'Father-in-law'    => ['reverse' => ['Son-in-law','Daughter-in-law']],
--     'Mother-in-law'    => ['reverse' => ['Son-in-law','Daughter-in-law']],
--     'Son-in-law'       => ['reverse' => ['Father-in-law','Mother-in-law']],
--     'Daughter-in-law'  => ['reverse' => ['Father-in-law','Mother-in-law']],
--     'Brother-in-law'   => ['reverse' => ['Brother-in-law','Sister-in-law']],
--     'Sister-in-law'    => ['reverse' => ['Brother-in-law','Sister-in-law']],
-- ];

CREATE TABLE customer_family_relations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id BIGINT UNSIGNED NOT NULL,
    relative_id BIGINT UNSIGNED NOT NULL,
    relation_type VARCHAR(50) NOT NULL,
    reverse_relation_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (relative_id) REFERENCES customers(id) ON DELETE CASCADE,
    UNIQUE (customer_id, relative_id)  -- prevent duplicates
);

CREATE TABLE customer_signatures (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id BIGINT UNSIGNED NOT NULL,
    signature_path VARCHAR(255) NOT NULL,
    role ENUM('DIRECTOR','PARTNER','AUTHORIZED_SIGNATORY') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);
```

```sql
-- =========================================
-- 3) Products (Policy)
-- =========================================
CREATE TABLE products (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    type ENUM'SAVINGS','SHARE','RECCURING_DEPOSIT','FIXED_DEPOSIT', 'INSURANCE', 'LOAN') NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,           -- unique product code
    name VARCHAR(100) NOT NULL,                 -- product name

    -- General Fields (apply to both)
    is_active BOOLEAN DEFAULT TRUE,
    gl_interest_id BIGINT UNSIGNED NULL,        -- GL mapping for interest income
    gl_fees_income_id BIGINT UNSIGNED NULL,     -- Account opening fees, Loan processing fees, Penalty charges, Service fees (SMS, card charges, etc.)

    -- Deposit-specific fields (NULL if category = LOAN)
    gl_control_id BIGINT UNSIGNED NULL,        -- liability control account for deposits
    interest_method ENUM('DAILY','MONTHLY','QUARTERLY','NONE') NULL,
    rate_bp INT NULL,                           -- interest rate (basis points, e.g. 500 = 5%)
    min_opening_amount DECIMAL(18,2) NULL,
    lock_in_days INT NULL,
    penalty_break_bp INT NULL,                  -- penalty rate for premature withdrawal

    -- Loan-specific fields (NULL if category = DEPOSIT)
    gl_principal_id BIGINT UNSIGNED NULL,     -- loan principal ledger
    penalty_bp INT NULL,                        -- penalty interest rate
    schedule_method ENUM('FLAT_EQUAL','REDUCING','INTEREST_ONLY','CUSTOM') NULL,
    max_tenor_months INT NULL,
    collateral_required BOOLEAN NULL,
    ltv_percent INT NULL,                       -- Loan-to-Value ratio

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE insurance_policies (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    member_id BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    policy_no VARCHAR(50) UNIQUE NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    premium_amount DECIMAL(18,2) NOT NULL,
    premium_cycle ENUM('MONTHLY','QUARTERLY','ANNUAL') DEFAULT 'MONTHLY',
    status ENUM('ACTIVE','LAPSED','CANCELLED','CLAIMED') DEFAULT 'ACTIVE',
    FOREIGN KEY (member_id) REFERENCES members(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

```sql
-- =========================================
-- 4) Accounts
-- =========================================
CREATE TABLE accounts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    account_no VARCHAR(50) UNIQUE NOT NULL,         -- core account number
    member_id BIGINT UNSIGNED NOT NULL,             -- who owns the account
    product_id BIGINT UNSIGNED NOT NULL,            -- FK to product definition
    branch_id BIGINT UNSIGNED NOT NULL,             -- branch opened
    opened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    closed_at TIMESTAMP NULL,                       -- if closed
    status ENUM('PENDING','ACTIVE','ON_HOLD','CLOSED','DEFAULTED','MATURED') DEFAULT 'PENDING',

    -- Account-specific fields
    balance DECIMAL(18,2) DEFAULT 0,                -- current balance / outstanding
    accrued_interest DECIMAL(18,2) DEFAULT 0,       -- interest earned or payable
    maturity_date DATE NULL,                        -- FD, RD, loan, insurance maturity
    tenor_months INT NULL,                          -- for term deposits/loans

    -- Role / Ownership
    product_type ENUM('SAVINGS','SHARE','RD','FD','LOAN','INSURANCE') NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (member_id) REFERENCES members(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (branch_id) REFERENCES branches(id)
);

-- Account holders (ownership)
CREATE TABLE account_customers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    account_id BIGINT UNSIGNED NOT NULL,
    customer_id BIGINT UNSIGNED NOT NULL,
    role ENUM('PRIMARY_HOLDER','JOINT_HOLDER','AUTHORIZED_SIGNATORY') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Introducers (separate relationship)
CREATE TABLE account_introducers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    account_id BIGINT UNSIGNED NOT NULL,
    introducer_customer_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
    FOREIGN KEY (introducer_customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

CREATE TABLE account_nominees (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    account_id BIGINT UNSIGNED NOT NULL,
    nominee_id BIGINT UNSIGNED NOT NULL,
    share_percentage DECIMAL(5,2) DEFAULT 0,
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
    FOREIGN KEY (nominee_id) REFERENCES customers(id)
);

CREATE TABLE account_signatories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    account_id BIGINT UNSIGNED NOT NULL,
    customer_id BIGINT UNSIGNED NOT NULL,
    signature_path VARCHAR(255) NOT NULL,  -- file path or blob ref
    mandate ENUM('SOLE','JOINT','EITHER','VIEW_ONLY') DEFAULT 'SOLE',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);
```

```sql
-- =========================================
-- 5) Term & Recurring Deposits
-- =========================================
CREATE TABLE term_deposits (
    account_id BIGINT UNSIGNED PRIMARY KEY,
    principal DECIMAL(18,2) NOT NULL,
    rate_bp INT NOT NULL, -- interest rate base point
    start_date DATE NOT NULL,
    maturity_date DATE NOT NULL,
    --how interest is calculated and added to the account.
    compounding ENUM('MONTHLY','QUARTERLY','SEMI_ANNUAL','ANNUAL','MATURITY') DEFAULT 'MATURITY',
    auto_renew BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE TABLE recurring_deposits (
    account_id BIGINT UNSIGNED PRIMARY KEY,
    installment_amount DECIMAL(18,2) NOT NULL,
    rate_bp INT NOT NULL, -- interest rate base point
    cycle ENUM('MONTHLY') DEFAULT 'MONTHLY',
    start_date DATE NOT NULL,
    tenor_months INT NOT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);
```

```sql
-- =========================================
-- 6) Loans
-- =========================================

-- Application Submitted
--         │
--         ▼
-- Verification & Assessment
--         │
--         ▼
-- Approved? ──No──> Rejected (Status: REJECTED)
--         │
--         Yes
--         ▼
-- Loan Approval (loan_approvals)
--         │
--         ▼
-- Disbursement (loan_disbursements)
--         │
--         ▼
-- Repayment & Monitoring (loan_repayments/account_transactions)
--         │
--         ▼
-- Fully Repaid? ──No──> Continue Repayment
--         │
--         Yes
--         ▼
-- Loan Closure (Status: CLOSED)

CREATE TABLE loan_applications (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id BIGINT UNSIGNED NOT NULL,
    loan_type ENUM('GENERAL','DEPOSIT','SECURED') DEFAULT 'GENERAL',
    -- Product Id
    amount_requested DECIMAL(18,2) NOT NULL,
    purpose TEXT,
    application_date DATE NOT NULL,
    status ENUM('PENDING','APPROVED','REJECTED','DISBURSED','CLOSED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (account_id) REFERENCES accounts(id)
);

CREATE TABLE loan_approvals (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    loan_application_id BIGINT UNSIGNED NOT NULL,
    approved_by BIGINT UNSIGNED NOT NULL,
    approved_amount DECIMAL(18,2) NOT NULL,
    interest_rate DECIMAL(5,2) NOT NULL,
    repayment_schedule JSON NOT NULL, -- installments, dates, amounts
    approved_date DATE NOT NULL,
    FOREIGN KEY (loan_application_id) REFERENCES loan_applications(id) ON DELETE CASCADE,
    FOREIGN KEY (approved_by) REFERENCES users(id)
);

CREATE TABLE loan_disbursements (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    loan_application_id BIGINT UNSIGNED NOT NULL,
    disbursement_date DATE NOT NULL,
    amount DECIMAL(18,2) NOT NULL,
    account_id BIGINT UNSIGNED NOT NULL, -- account credited
    FOREIGN KEY (loan_application_id) REFERENCES loan_applications(id) ON DELETE CASCADE,
    FOREIGN KEY (account_id) REFERENCES accounts(id)
);

CREATE TABLE loan_application_status_history (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    loan_application_id BIGINT UNSIGNED NOT NULL,
    status ENUM('PENDING','APPROVED','REJECTED','DISBURSED','CLOSED') NOT NULL,
    changed_by BIGINT UNSIGNED NOT NULL,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (loan_application_id) REFERENCES loan_applications(id) ON DELETE CASCADE,
    FOREIGN KEY (changed_by) REFERENCES users(id)
);

CREATE TABLE loan_sureties (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    loan_application_id BIGINT UNSIGNED NOT NULL,
    account_id BIGINT UNSIGNED NOT NULL,
    surety_type ENUM('SURETY','LEAN') NOT NULL,
    amount DECIMAL(18,2) NOT NULL,
    FOREIGN KEY (loan_application_id) REFERENCES loan_applications(id) ON DELETE CASCADE,
    FOREIGN KEY (account_id) REFERENCES accounts(id)
);

CREATE TABLE loan_collaterals (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    loan_application_id BIGINT UNSIGNED NOT NULL,
    collateral_type ENUM('ASSET','PROPERTY') NOT NULL,
    reference VARCHAR(255),
    value DECIMAL(18,2) NOT NULL,
    description VARCHAR(255),
    FOREIGN KEY (loan_application_id) REFERENCES loan_applications(id) ON DELETE CASCADE
);

CREATE TABLE loan_guarantors (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    loan_application_id BIGINT UNSIGNED NOT NULL,
    customer_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (loan_application_id) REFERENCES loan_applications(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE loan_application_work_details (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    loan_application_id BIGINT UNSIGNED NOT NULL,
    employer_name VARCHAR(100),
    designation VARCHAR(50),
    employment_type ENUM('PERMANENT','CONTRACT','SELF_EMPLOYED','OTHER') DEFAULT 'OTHER',
    monthly_income DECIMAL(18,2),
    years_of_service INT,
    FOREIGN KEY (loan_application_id) REFERENCES loan_applications(id) ON DELETE CASCADE
);

CREATE TABLE loan_application_assets (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    loan_application_id BIGINT UNSIGNED NOT NULL,
    asset_type VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    value DECIMAL(18,2) NOT NULL,
    FOREIGN KEY (loan_application_id) REFERENCES loan_applications(id) ON DELETE CASCADE
);

CREATE TABLE loan_application_incomes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    loan_application_id BIGINT UNSIGNED NOT NULL,
    source VARCHAR(100),
    monthly_amount DECIMAL(18,2),
    frequency ENUM('MONTHLY','ANNUAL','OTHER') DEFAULT 'MONTHLY',
    FOREIGN KEY (loan_application_id) REFERENCES loan_applications(id) ON DELETE CASCADE
);

CREATE TABLE loan_application_expenses (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    loan_application_id BIGINT UNSIGNED NOT NULL,
    category VARCHAR(50),
    monthly_amount DECIMAL(18,2),
    FOREIGN KEY (loan_application_id) REFERENCES loan_applications(id) ON DELETE CASCADE
);

CREATE TABLE loan_application_supporting_docs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    loan_application_id BIGINT UNSIGNED NOT NULL,
    file_name VARCHAR(255),
    file_path VARCHAR(255),
    mime VARCHAR(50),
    document_type VARCHAR(50), -- e.g., Gas Bill, Electricity, Passport
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (loan_application_id) REFERENCES loan_applications(id) ON DELETE CASCADE
);
```

```sql

-- =========================================
-- 7) Bank / Cash / Vault / Teller
-- =========================================

CREATE TABLE bank_accounts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    branch_id BIGINT UNSIGNED NOT NULL,
    bank_name VARCHAR(100) NOT NULL,
    account_no VARCHAR(50) NOT NULL,
    currency CHAR(3) DEFAULT 'USD',
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (branch_id) REFERENCES branches(id)
);

CREATE TABLE vaults (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    branch_id BIGINT UNSIGNED NOT NULL,
    balance DECIMAL(18,2) DEFAULT 0,
    FOREIGN KEY (branch_id) REFERENCES branches(id)
);

CREATE TABLE vault_denominations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    vault_id BIGINT UNSIGNED NOT NULL,
    denomination INT NOT NULL,        -- bill/coin value
    quantity INT NOT NULL DEFAULT 0,  -- number of bills/coins
    FOREIGN KEY (vault_id) REFERENCES vaults(id)
);

CREATE TABLE cash_drawers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    branch_id BIGINT UNSIGNED NOT NULL,
    assigned_user_id BIGINT UNSIGNED,
    balance DECIMAL(18,2) DEFAULT 0,
    FOREIGN KEY (branch_id) REFERENCES branches(id),
    FOREIGN KEY (assigned_user_id) REFERENCES users(id)
);

CREATE TABLE teller_shifts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    drawer_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    opened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    closed_at TIMESTAMP,
    opening_expected DECIMAL(18,2) DEFAULT 0,
    closing_expected DECIMAL(18,2),
    closing_counted DECIMAL(18,2),
    variance DECIMAL(18,2),
    FOREIGN KEY (drawer_id) REFERENCES cash_drawers(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE cash_transactions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    account_id BIGINT UNSIGNED,             -- optional for deposits/withdrawals
    teller_id BIGINT UNSIGNED,             -- nullable for online/bank transactions
    vault_id BIGINT UNSIGNED,              -- nullable for teller or online transactions
    bank_account_id BIGINT UNSIGNED,       -- nullable unless cash-in/out with bank
    type ENUM(
        'DEPOSIT','WITHDRAWAL','TRANSFER',
        'LOAN_DISBURSEMENT','LOAN_REPAYMENT',
        'CHEQUE_CLEARANCE','CASH_IN','CASH_OUT'
    ) NOT NULL,
    mode ENUM('CASH','CHEQUE','TRANSFER') NOT NULL DEFAULT 'CASH',
    source ENUM('TELLER','BANK','SYSTEM') NOT NULL DEFAULT 'TELLER',
    amount DECIMAL(18,2) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reference_no VARCHAR(50),
    FOREIGN KEY (account_id) REFERENCES accounts(id),
    FOREIGN KEY (teller_id) REFERENCES users(id),
    FOREIGN KEY (vault_id) REFERENCES vaults(id),
    FOREIGN KEY (bank_account_id) REFERENCES bank_accounts(id)
);
```

```sql
-- =========================================
-- 8) Journals / GL
-- =========================================
CREATE TABLE gl_accounts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    type ENUM('ASSET','LIABILITY','EQUITY','INCOME','EXPENSE') NOT NULL,
    is_leaf BOOLEAN DEFAULT TRUE,
    parent_id BIGINT UNSIGNED,
    FOREIGN KEY (parent_id) REFERENCES gl_accounts(id)
);

CREATE TABLE journal_entries (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tx_code VARCHAR(50),
    tx_ref VARCHAR(50),
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    branch_id BIGINT UNSIGNED,
    user_id BIGINT UNSIGNED,
    memo TEXT,
    FOREIGN KEY (branch_id) REFERENCES branches(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE journal_lines (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    entry_id BIGINT UNSIGNED NOT NULL,
    gl_account_id BIGINT UNSIGNED NOT NULL,
    account_id BIGINT UNSIGNED,
    debit DECIMAL(18,2) DEFAULT 0,
    credit DECIMAL(18,2) DEFAULT 0,
    CHECK ((debit = 0 AND credit > 0) OR (credit = 0 AND debit > 0)),
    FOREIGN KEY (entry_id) REFERENCES journal_entries(id) ON DELETE CASCADE,
    FOREIGN KEY (gl_account_id) REFERENCES gl_accounts(id),
    FOREIGN KEY (account_id) REFERENCES accounts(id)
);

```

```sql
-- =========================================
-- 9) Payments / Schedules / Interest / Charges
-- =========================================
CREATE TABLE schedules (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    account_id BIGINT UNSIGNED NOT NULL,
    due_date DATE NOT NULL,
    principal_due DECIMAL(18,2) DEFAULT 0,
    interest_due DECIMAL(18,2) DEFAULT 0,
    fee_due DECIMAL(18,2) DEFAULT 0,
    component ENUM('LOAN','RD','FD') NOT NULL,
    sequence_no INT NOT NULL,
    status ENUM('PENDING','PARTIAL','PAID','WAIVED','CLOSED') DEFAULT 'PENDING',
    UNIQUE(account_id, sequence_no),
    FOREIGN KEY (account_id) REFERENCES accounts(id)
);

CREATE TABLE insurance_premiums (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    policy_id BIGINT UNSIGNED NOT NULL,
    due_date DATE NOT NULL,
    amount DECIMAL(18,2) NOT NULL,
    status ENUM('PENDING','PAID','OVERDUE','WAIVED') DEFAULT 'PENDING',
    paid_at TIMESTAMP NULL,
    journal_entry_id BIGINT UNSIGNED,
    FOREIGN KEY (policy_id) REFERENCES insurance_policies(id),
    FOREIGN KEY (journal_entry_id) REFERENCES journal_entries(id)
);

CREATE TABLE payments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    account_id BIGINT UNSIGNED NOT NULL,
    schedule_id BIGINT UNSIGNED,
    amount DECIMAL(18,2) NOT NULL,
    method ENUM('CASH','TRANSFER','ADJUSTMENT') NOT NULL,
    received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    journal_entry_id BIGINT UNSIGNED,
    FOREIGN KEY (account_id) REFERENCES accounts(id),
    FOREIGN KEY (schedule_id) REFERENCES schedules(id),
    FOREIGN KEY (journal_entry_id) REFERENCES journal_entries(id)
);

CREATE TABLE interest_accruals (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    account_id BIGINT UNSIGNED NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    interest_amount DECIMAL(18,2) NOT NULL,
    journal_entry_id BIGINT UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id),
    FOREIGN KEY (journal_entry_id) REFERENCES journal_entries(id)
);

CREATE TABLE charges (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    account_id BIGINT UNSIGNED NOT NULL,
    code VARCHAR(50) NOT NULL,
    amount DECIMAL(18,2) NOT NULL,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    journal_entry_id BIGINT UNSIGNED,
    FOREIGN KEY (account_id) REFERENCES accounts(id),
    FOREIGN KEY (journal_entry_id) REFERENCES journal_entries(id)
);

CREATE TABLE insurance_claims (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    policy_id BIGINT UNSIGNED NOT NULL,
    claim_date DATE NOT NULL,
    claim_amount DECIMAL(18,2) NOT NULL,
    status ENUM('PENDING','APPROVED','REJECTED','PAID') DEFAULT 'PENDING',
    processed_by BIGINT UNSIGNED,
    paid_at TIMESTAMP NULL,
    journal_entry_id BIGINT UNSIGNED,
    FOREIGN KEY (policy_id) REFERENCES insurance_policies(id),
    FOREIGN KEY (processed_by) REFERENCES users(id),
    FOREIGN KEY (journal_entry_id) REFERENCES journal_entries(id)
);
```

```sql
-- =========================================
-- 10) Cheques
-- =========================================
CREATE TABLE cheque_books (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    account_id BIGINT UNSIGNED NOT NULL,
    book_no VARCHAR(50) NOT NULL,
    start_no INT NOT NULL,
    end_no INT NOT NULL,
    issued_date DATE NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (account_id) REFERENCES accounts(id)
);

CREATE TABLE cheques (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    cheque_book_id BIGINT UNSIGNED NOT NULL,
    cheque_no INT NOT NULL,
    payee VARCHAR(100),
    amount DECIMAL(18,2),
    status ENUM('ISSUED','PENDING','CLEARED','BOUNCED','CANCELLED') DEFAULT 'ISSUED',
    issue_date DATE NOT NULL,
    clearance_date DATE,
    FOREIGN KEY (cheque_book_id) REFERENCES cheque_books(id)
);
-- status meanings:
-- ISSUED → customer has written the cheque, not yet presented.
-- PENDING → cheque presented but not cleared.
-- CLEARED → funds debited and cheque cleared.
-- BOUNCED → cheque returned unpaid (insufficient funds or stop payment).
-- CANCELLED → customer voided the cheque.

CREATE TABLE pending_cheque_debits (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    cheque_id BIGINT UNSIGNED NOT NULL,
    account_id BIGINT UNSIGNED NOT NULL,
    amount DECIMAL(18,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cheque_id) REFERENCES cheques(id),
    FOREIGN KEY (account_id) REFERENCES accounts(id)
);
-- Ensures account balance minus pending holds is available for withdrawals.
-- Automatically cleared when cheque clears or bounces.


-- System Entry
-- Once presented, the bank system does:
-- Check the account number on the cheque.
-- Create a cheques record in the system (if not already linked to a cheque book).
-- Set status = PENDING.
-- Optionally create pending_cheque_debits to hold funds.
-- This is the first time the system “knows” the cheque exists.
```

```sql
-- =========================================
-- 11) Audit Log
-- =========================================
CREATE TABLE audits (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    auditable_type VARCHAR(150) NOT NULL,
    auditable_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED,
    event ENUM('CREATED','UPDATED','DELETED','RESTORED') NOT NULL,
    old_values JSON,
    new_values JSON,
    url VARCHAR(255),
    ip_address VARCHAR(45),
    user_agent VARCHAR(255),
    branch_id BIGINT UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_auditable (auditable_type, auditable_id),
    INDEX idx_user (user_id),
    INDEX idx_event (event),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (branch_id) REFERENCES branches(id)
);
```
