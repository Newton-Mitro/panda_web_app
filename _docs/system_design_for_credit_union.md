Credit Union System Design

High-level domain model

Actors & org

    • customers (KYC’d people or entities)
    • branches, users (tellers/ops), roles

Products

    • deposit_products (Savings, Share, Recurring Deposit, Fixed Deposit)
    • loan_products (Standard loan, Loan-Against-Deposit)

Accounts

    • accounts (one row per deposit or loan account; typed)
    • term_deposits (FD details: principal, tenor, rate, maturity)
    • recurring_deposits (RD details: installment amount/cycle)
    • loan_accounts (approved amount, rate, schedule method)
    • loan_collateral_deposits (lien: loan ↔ deposit accounts)

Transactions & interest

    • journal_entries, journal_lines (system of record: double-entry)
    • postings_view (optional SQL view joining lines)
    • interest_accruals, interest_capitalizations (auditable interest)
    • fees / charges (one-off or recurring)
    • schedules (amortization & RD/FD schedules)
    • payments (cash/transfer/adjustment)

Cash ops

    • gl_accounts (chart of accounts)
    • vaults, cash_drawers (per branch + teller)
    • cash_transfers (vault↔drawer, drawer↔drawer, CIT)
    • cash_counts (denomination counts for EOD proof)
    • teller_shifts (open/close, variance)

Principle: All money movement = journal lines (debits = credits). Product “transactions” are derived from journals by filtering Gls/subledgers.

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
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- =========================================
-- 3) Products (Policy)
-- =========================================
CREATE TABLE deposit_products (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    type ENUM('SAVINGS','SHARE','RD','FD') NOT NULL,
    interest_method ENUM('DAILY','MONTHLY','QUARTERLY','NONE') DEFAULT 'NONE',
    rate_bp INT DEFAULT 0,
    min_opening_amount DECIMAL(18,2) DEFAULT 0,
    lock_in_days INT DEFAULT 0,
    penalty_break_bp INT DEFAULT 0,
    gl_control_id BIGINT UNSIGNED,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE loan_products (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    type ENUM('STANDARD','LAD') NOT NULL,
    rate_bp INT NOT NULL,
    penalty_bp INT DEFAULT 0,
    schedule_method ENUM('FLAT','REDUCING','INTEREST_ONLY','CUSTOM') DEFAULT 'FLAT',
    max_tenor_months INT DEFAULT 12,
    collateral_required BOOLEAN DEFAULT FALSE,
    ltv_percent INT DEFAULT 90,
    gl_principal_id BIGINT UNSIGNED,
    gl_interest_income_id BIGINT UNSIGNED
);

-- =========================================
-- 4) Accounts
-- =========================================
CREATE TABLE accounts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    account_no VARCHAR(50) UNIQUE NOT NULL,
    customer_id BIGINT UNSIGNED NOT NULL,
    product_kind ENUM('SAVINGS','SHARE','RD','FD','LOAN') NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    opened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('ACTIVE','ON_HOLD','CLOSED') DEFAULT 'ACTIVE',
    branch_id BIGINT UNSIGNED,
    balance DECIMAL(18,2) DEFAULT 0,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (branch_id) REFERENCES branches(id)
);

CREATE TABLE joint_account_customers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    account_id BIGINT UNSIGNED NOT NULL,
    customer_id BIGINT UNSIGNED NOT NULL,
    role ENUM('joint_holder','introducer') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
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

-- =========================================
-- 5) Term & Recurring Deposits
-- =========================================
CREATE TABLE term_deposits (
    account_id BIGINT UNSIGNED PRIMARY KEY,
    principal DECIMAL(18,2) NOT NULL,
    rate_bp INT NOT NULL,
    start_date DATE NOT NULL,
    maturity_date DATE NOT NULL,
    compounding ENUM('MONTHLY','QUARTERLY','SEMI_ANNUAL','ANNUAL','MATURITY') DEFAULT 'MATURITY',
    auto_renew BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE TABLE recurring_deposits (
    account_id BIGINT UNSIGNED PRIMARY KEY,
    installment_amount DECIMAL(18,2) NOT NULL,
    rate_bp INT NOT NULL,
    cycle ENUM('MONTHLY') DEFAULT 'MONTHLY',
    start_date DATE NOT NULL,
    tenor_months INT NOT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);

-- =========================================
-- 6) Loans
-- =========================================
CREATE TABLE loan_applications (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id BIGINT UNSIGNED NOT NULL,
    account_id BIGINT UNSIGNED,
    loan_type ENUM('GENERAL','DEPOSIT','SECURED') DEFAULT 'GENERAL',
    amount_requested DECIMAL(18,2) NOT NULL,
    purpose TEXT,
    application_date DATE NOT NULL,
    status ENUM('PENDING','APPROVED','REJECTED','DISBURSED') DEFAULT 'PENDING',
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (account_id) REFERENCES accounts(id)
);

CREATE TABLE loan_approvals (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    loan_application_id BIGINT UNSIGNED NOT NULL,
    approved_by BIGINT UNSIGNED NOT NULL,
    approved_amount DECIMAL(18,2) NOT NULL,
    interest_rate DECIMAL(5,2),
    repayment_terms VARCHAR(255),
    approved_date DATE NOT NULL,
    FOREIGN KEY (loan_application_id) REFERENCES loan_applications(id) ON DELETE CASCADE,
    FOREIGN KEY (approved_by) REFERENCES users(id)
);

CREATE TABLE loan_sureties (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    loan_application_id BIGINT UNSIGNED NOT NULL,
    customer_id BIGINT UNSIGNED NOT NULL,
    surety_type ENUM('SURETY','GUARANTOR') NOT NULL,
    FOREIGN KEY (loan_application_id) REFERENCES loan_applications(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE loan_collaterals (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    loan_application_id BIGINT UNSIGNED NOT NULL,
    collateral_type ENUM('DEPOSIT','ASSET','PROPERTY') NOT NULL,
    reference_id BIGINT UNSIGNED,
    value DECIMAL(18,2) NOT NULL,
    FOREIGN KEY (loan_application_id) REFERENCES loan_applications(id) ON DELETE CASCADE
);

CREATE TABLE loan_application_work_details (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    loan_application_id BIGINT UNSIGNED NOT NULL,
    employer_name VARCHAR(100),
    designation VARCHAR(50),
    employment_type VARCHAR(50),
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
    file_name VARCHAR(50),
    file_path VARCHAR(50),
    mime VARCHAR(50),
    document_type VARCHAR(50), // Gass, Electricity
    FOREIGN KEY (loan_application_id) REFERENCES loan_applications(id) ON DELETE CASCADE
);

-- =========================================
-- 7) Cash / Vault / Teller
-- =========================================
CREATE TABLE vaults (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    branch_id BIGINT UNSIGNED NOT NULL,
    balance DECIMAL(18,2) DEFAULT 0,
    FOREIGN KEY (branch_id) REFERENCES branches(id)
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
    account_id BIGINT UNSIGNED,
    teller_id BIGINT UNSIGNED NOT NULL,
    type ENUM('DEPOSIT','WITHDRAWAL','TRANSFER','LOAN_DISBURSEMENT','LOAN_REPAYMENT','CHEQUE_CLEARANCE'),
    amount DECIMAL(18,2) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mode ENUM('CASH','CHEQUE','TRANSFER'),
    reference_no VARCHAR(50),
    FOREIGN KEY (account_id) REFERENCES accounts(id),
    FOREIGN KEY (teller_id) REFERENCES users(id)
);

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
    status ENUM('ISSUED','CLEARED','BOUNCED','CANCELLED') DEFAULT 'ISSUED',
    issue_date DATE,
    clearance_date DATE,
    FOREIGN KEY (cheque_book_id) REFERENCES cheque_books(id)
);

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

### Laravel Migration

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // =========================================
        // 1) Branches & Users
        // =========================================
        Schema::create('branches', function (Blueprint $table) {
            $table->id();
            $table->string('code', 20)->unique();
            $table->string('name', 100);
            $table->string('address', 255)->nullable();
            $table->timestamps();
        });

        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained()->cascadeOnDelete();
            $table->string('full_name', 100);
            $table->string('email', 100)->unique();
            $table->string('password');
            $table->enum('role', ['TELLER','OPS','MANAGER','ADMIN']);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // =========================================
        // 2) Customers
        // =========================================
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('customer_no', 50)->unique();
            $table->enum('type', ['individual','organization']);
            $table->string('full_name', 150);
            $table->string('registration_no')->nullable(); // For organizations
            $table->date('dob')->nullable();
            $table->enum('gender', ['M','F','O'])->nullable();
            $table->string('nid', 50)->nullable();
            $table->string('phone', 50)->nullable();
            $table->string('email', 100)->nullable();
            $table->enum('kyc_level', ['MIN','STD','ENH'])->default('MIN');
            $table->enum('status', ['PENDING','ACTIVE','SUSPENDED','CLOSED'])->default('ACTIVE');
            $table->timestamps();
        });

        Schema::create('customer_family_relations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained('customers')->cascadeOnDelete();
            $table->foreignId('relative_id')->constrained('customers')->cascadeOnDelete();
            $table->string('relation_type', 50)->nullable();
            $table->timestamps();
        });

        Schema::create('customer_signatures', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained('customers')->cascadeOnDelete();
            $table->string('signature_path', 255);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        // =========================================
        // 3) Products
        // =========================================
        Schema::create('deposit_products', function (Blueprint $table) {
            $table->id();
            $table->string('code', 50)->unique();
            $table->string('name', 100);
            $table->enum('type', ['SAVINGS','SHARE','RD','FD']);
            $table->enum('interest_method', ['DAILY','MONTHLY','QUARTERLY','NONE'])->default('NONE');
            $table->integer('rate_bp')->default(0);
            $table->decimal('min_opening_amount', 18, 2)->default(0);
            $table->integer('lock_in_days')->default(0);
            $table->integer('penalty_break_bp')->default(0);
            $table->unsignedBigInteger('gl_control_id')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('loan_products', function (Blueprint $table) {
            $table->id();
            $table->string('code', 50)->unique();
            $table->string('name', 100);
            $table->enum('type', ['STANDARD','LAD']);
            $table->integer('rate_bp');
            $table->integer('penalty_bp')->default(0);
            $table->enum('schedule_method', ['FLAT','REDUCING','INTEREST_ONLY','CUSTOM'])->default('FLAT');
            $table->integer('max_tenor_months')->default(12);
            $table->boolean('collateral_required')->default(false);
            $table->integer('ltv_percent')->default(90);
            $table->unsignedBigInteger('gl_principal_id')->nullable();
            $table->unsignedBigInteger('gl_interest_income_id')->nullable();
            $table->timestamps();
        });

        // =========================================
        // 4) Accounts
        // =========================================
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->string('account_no', 50)->unique();
            $table->foreignId('customer_id')->constrained('customers');
            $table->enum('product_kind', ['SAVINGS','SHARE','RD','FD','LOAN']);
            $table->unsignedBigInteger('product_id');
            $table->foreignId('branch_id')->nullable()->constrained('branches');
            $table->enum('status', ['ACTIVE','ON_HOLD','CLOSED'])->default('ACTIVE');
            $table->decimal('balance', 18, 2)->default(0);
            $table->timestamp('opened_at')->useCurrent();
            $table->timestamps();
        });

        Schema::create('joint_account_customers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->constrained('accounts')->cascadeOnDelete();
            $table->foreignId('customer_id')->constrained('customers')->cascadeOnDelete();
            $table->enum('role', ['joint_holder','introducer']);
            $table->timestamps();
        });

        Schema::create('account_nominees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->constrained('accounts')->cascadeOnDelete();
            $table->foreignId('nominee_id')->constrained('customers');
            $table->decimal('share_percentage', 5, 2)->default(0);
            $table->timestamps();
        });

        Schema::create('account_signatories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')
                  ->constrained('accounts')
                  ->onDelete('cascade');

            $table->foreignId('customer_id')
                  ->constrained('customers')
                  ->onDelete('cascade');

            // Path or filename of signature image (stored in storage/app or S3)
            $table->string('signature_path', 255);

            // Mandate rules (sole, joint, either, etc.)
            $table->enum('mandate', ['SOLE', 'JOINT', 'EITHER', 'VIEW_ONLY'])
                  ->default('SOLE');

            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // =========================================
        // 5) Term & Recurring Deposits
        // =========================================
        Schema::create('term_deposits', function (Blueprint $table) {
            $table->foreignId('account_id')->primary()->constrained('accounts')->cascadeOnDelete();
            $table->decimal('principal', 18, 2);
            $table->integer('rate_bp');
            $table->date('start_date');
            $table->date('maturity_date');
            $table->enum('compounding', ['MONTHLY','QUARTERLY','SEMI_ANNUAL','ANNUAL','MATURITY'])->default('MATURITY');
            $table->boolean('auto_renew')->default(false);
            $table->timestamps();
        });

        Schema::create('recurring_deposits', function (Blueprint $table) {
            $table->foreignId('account_id')->primary()->constrained('accounts')->cascadeOnDelete();
            $table->decimal('installment_amount', 18, 2);
            $table->integer('rate_bp');
            $table->enum('cycle', ['MONTHLY'])->default('MONTHLY');
            $table->date('start_date');
            $table->integer('tenor_months');
            $table->timestamps();
        });

        // =========================================
        // 6) Loans
        // =========================================
        Schema::create('loan_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained('customers');
            $table->foreignId('account_id')->nullable()->constrained('accounts');
            $table->enum('loan_type', ['GENERAL','DEPOSIT','SECURED'])->default('GENERAL');
            $table->decimal('amount_requested', 18, 2);
            $table->text('purpose')->nullable();
            $table->date('application_date');
            $table->enum('status', ['PENDING','APPROVED','REJECTED','DISBURSED'])->default('PENDING');
            $table->timestamps();
        });

        Schema::create('loan_approvals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('loan_application_id')->constrained('loan_applications')->cascadeOnDelete();
            $table->foreignId('approved_by')->constrained('users');
            $table->decimal('approved_amount', 18, 2);
            $table->decimal('interest_rate', 5, 2)->nullable();
            $table->string('repayment_terms', 255)->nullable();
            $table->date('approved_date');
            $table->timestamps();
        });

        Schema::create('loan_sureties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('loan_application_id')->constrained('loan_applications')->cascadeOnDelete();
            $table->foreignId('customer_id')->constrained('customers');
            $table->enum('surety_type', ['SURETY','GUARANTOR']);
            $table->timestamps();
        });

        Schema::create('loan_collaterals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('loan_application_id')->constrained('loan_applications')->cascadeOnDelete();
            $table->enum('collateral_type', ['DEPOSIT','ASSET','PROPERTY']);
            $table->unsignedBigInteger('reference_id')->nullable();
            $table->decimal('value', 18, 2);
            $table->timestamps();
        });

        Schema::create('loan_applicant_work_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('loan_application_id')->constrained('loan_applications')->cascadeOnDelete();
            $table->string('employer_name', 100)->nullable();
            $table->string('designation', 50)->nullable();
            $table->string('employment_type', 50)->nullable();
            $table->decimal('monthly_income', 18, 2)->nullable();
            $table->integer('years_of_service')->nullable();
            $table->timestamps();
        });

        Schema::create('loan_applicant_assets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('loan_application_id')->constrained('loan_applications')->cascadeOnDelete();
            $table->string('asset_type', 50);
            $table->string('description', 255)->nullable();
            $table->decimal('value', 18, 2);
            $table->timestamps();
        });

        Schema::create('loan_applicant_incomes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('loan_application_id')->constrained('loan_applications')->cascadeOnDelete();
            $table->string('source', 100)->nullable();
            $table->decimal('monthly_amount', 18, 2)->nullable();
            $table->timestamps();
        });

        Schema::create('loan_applicant_expenses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('loan_application_id')->constrained('loan_applications')->cascadeOnDelete();
            $table->string('category', 50)->nullable();
            $table->decimal('monthly_amount', 18, 2)->nullable();
            $table->timestamps();
        });

        // =========================================
        // 7) Cash / Vault / Teller
        // =========================================
        Schema::create('vaults', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained('branches');
            $table->decimal('balance', 18, 2)->default(0);
            $table->timestamps();
        });

        Schema::create('cash_drawers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained('branches');
            $table->foreignId('assigned_user_id')->nullable()->constrained('users');
            $table->decimal('balance', 18, 2)->default(0);
            $table->timestamps();
        });

        Schema::create('teller_shifts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('drawer_id')->constrained('cash_drawers');
            $table->foreignId('user_id')->constrained('users');
            $table->timestamp('opened_at')->useCurrent();
            $table->timestamp('closed_at')->nullable();
            $table->decimal('opening_expected', 18, 2)->default(0);
            $table->decimal('closing_expected', 18, 2)->nullable();
            $table->decimal('closing_counted', 18, 2)->nullable();
            $table->decimal('variance', 18, 2)->nullable();
            $table->timestamps();
        });

        Schema::create('cash_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->nullable()->constrained('accounts');
            $table->foreignId('teller_id')->constrained('users');
            $table->enum('type', ['DEPOSIT','WITHDRAWAL','TRANSFER','LOAN_DISBURSEMENT','LOAN_REPAYMENT','CHEQUE_CLEARANCE']);
            $table->decimal('amount', 18, 2);
            $table->timestamp('transaction_date')->useCurrent();
            $table->enum('mode', ['CASH','CHEQUE','TRANSFER'])->nullable();
            $table->string('reference_no', 50)->nullable();
            $table->timestamps();
        });

        // =========================================
        // 8) Journals / GL
        // =========================================
        Schema::create('gl_accounts', function (Blueprint $table) {
            $table->id();
            $table->string('code', 50)->unique();
            $table->string('name', 100);
            $table->enum('type', ['ASSET','LIABILITY','EQUITY','INCOME','EXPENSE']);
            $table->boolean('is_leaf')->default(true);
            $table->foreignId('parent_id')->nullable()->constrained('gl_accounts');
            $table->timestamps();
        });

        Schema::create('journal_entries', function (Blueprint $table) {
            $table->id();
            $table->string('tx_code', 50)->nullable();
            $table->string('tx_ref', 50)->nullable();
            $table->timestamp('posted_at')->useCurrent();
            $table->foreignId('branch_id')->nullable()->constrained('branches');
            $table->foreignId('user_id')->nullable()->constrained('users');
            $table->text('memo')->nullable();
            $table->timestamps();
        });

        Schema::create('journal_lines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('entry_id')->constrained('journal_entries')->cascadeOnDelete();
            $table->foreignId('gl_account_id')->constrained('gl_accounts');
            $table->foreignId('account_id')->nullable()->constrained('accounts');
            $table->decimal('debit', 18, 2)->default(0);
            $table->decimal('credit', 18, 2)->default(0);
            $table->timestamps();
        });

        // =========================================
        // 9) Payments / Schedules / Interest / Charges
        // =========================================
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->constrained('accounts');
            $table->date('due_date');
            $table->decimal('principal_due', 18, 2)->default(0);
            $table->decimal('interest_due', 18, 2)->default(0);
            $table->decimal('fee_due', 18, 2)->default(0);
            $table->enum('component', ['LOAN','RD','FD']);
            $table->integer('sequence_no');
            $table->enum('status', ['PENDING','PARTIAL','PAID','WAIVED','CLOSED'])->default('PENDING');
            $table->unique(['account_id','sequence_no']);
            $table->timestamps();
        });

        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->constrained('accounts');
            $table->foreignId('schedule_id')->nullable()->constrained('schedules');
            $table->decimal('amount', 18, 2);
            $table->enum('method', ['CASH','TRANSFER','ADJUSTMENT']);
            $table->timestamp('received_at')->useCurrent();
            $table->foreignId('journal_entry_id')->nullable()->constrained('journal_entries');
            $table->timestamps();
        });

        Schema::create('interest_accruals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->constrained('accounts');
            $table->date('period_start');
            $table->date('period_end');
            $table->decimal('interest_amount', 18, 2);
            $table->foreignId('journal_entry_id')->nullable()->constrained('journal_entries');
            $table->timestamps();
        });

        Schema::create('charges', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->constrained('accounts');
            $table->string('code', 50);
            $table->decimal('amount', 18, 2);
            $table->timestamp('applied_at')->useCurrent();
            $table->foreignId('journal_entry_id')->nullable()->constrained('journal_entries');
            $table->timestamps();
        });

        // =========================================
        // 10) Cheques
        // =========================================
        Schema::create('cheque_books', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->constrained('accounts');
            $table->string('book_no', 50);
            $table->integer('start_no');
            $table->integer('end_no');
            $table->date('issued_date');
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        Schema::create('cheques', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cheque_book_id')->constrained('cheque_books');
            $table->integer('cheque_no');
            $table->string('payee', 100)->nullable();
            $table->decimal('amount', 18, 2)->nullable();
            $table->enum('status', ['ISSUED','CLEARED','BOUNCED','CANCELLED'])->default('ISSUED');
            $table->date('issue_date')->nullable();
            $table->date('clearance_date')->nullable();
            $table->timestamps();
        });

        // =========================================
        // 11) Audit Log
        // =========================================
        Schema::create('audits', function (Blueprint $table) {
            $table->id();
            $table->string('auditable_type', 150);
            $table->unsignedBigInteger('auditable_id');
            $table->foreignId('user_id')->nullable()->constrained('users');
            $table->enum('event', ['CREATED','UPDATED','DELETED','RESTORED']);
            $table->json('old_values')->nullable();
            $table->json('new_values')->nullable();
            $table->string('url', 255)->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->string('user_agent', 255)->nullable();
            $table->foreignId('branch_id')->nullable()->constrained('branches');
            $table->timestamps();
            $table->index(['auditable_type','auditable_id']);
            $table->index('user_id');
            $table->index('event');
        });
    }

    public function down(): void
    {
        Schema::disableForeignKeyConstraints();

        Schema::dropIfExists('audits');
        Schema::dropIfExists('cheques');
        Schema::dropIfExists('cheque_books');
        Schema::dropIfExists('charges');
        Schema::dropIfExists('interest_accruals');
        Schema::dropIfExists('payments');
        Schema::dropIfExists('schedules');
        Schema::dropIfExists('journal_lines');
        Schema::dropIfExists('journal_entries');
        Schema::dropIfExists('gl_accounts');
        Schema::dropIfExists('cash_transactions');
        Schema::dropIfExists('teller_shifts');
        Schema::dropIfExists('cash_drawers');
        Schema::dropIfExists('vaults');
        Schema::dropIfExists('loan_applicant_expenses');
        Schema::dropIfExists('loan_applicant_incomes');
        Schema::dropIfExists('loan_applicant_assets');
        Schema::dropIfExists('loan_applicant_work_details');
        Schema::dropIfExists('loan_collaterals');
        Schema::dropIfExists('loan_sureties');
        Schema::dropIfExists('loan_approvals');
        Schema::dropIfExists('loan_applications');
        Schema::dropIfExists('recurring_deposits');
        Schema::dropIfExists('term_deposits');
        Schema::dropIfExists('account_nominees');
        Schema::dropIfExists('joint_account_customers');
        Schema::dropIfExists('accounts');
        Schema::dropIfExists('loan_products');
        Schema::dropIfExists('deposit_products');
        Schema::dropIfExists('customer_signatures');
        Schema::dropIfExists('customer_family_relations');
        Schema::dropIfExists('customers');
        Schema::dropIfExists('users');
        Schema::dropIfExists('branches');

        Schema::enableForeignKeyConstraints();
    }
};

```
