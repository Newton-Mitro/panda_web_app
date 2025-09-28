function QuestionAnswerItem({ question, answer, idx }) {
    return (
        <div className="">
            {question && <p className="font-semibold">{`${idx + 1}. ${question}`}</p>}
            {answer && <p className="text-[var(--muted-foreground)]">{answer}</p>}
        </div>
    );
}

export default QuestionAnswerItem;
