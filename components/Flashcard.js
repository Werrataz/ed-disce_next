import Editor from "./Editor"

function QuestionEditor({delta}) {

    return (
            <Editor extraClass="question" />
    )
}

function AnswerEditor({delta}) {
    return (
            <Editor extraClass="answer"/>
    )
}

function Flashcard() {
    return (
        <div className="flashcard">
        <QuestionEditor />
        <AnswerEditor />
        </div>
    )
}

export default Flashcard;