import IconCardItem from '../../../components/service-card-border-icon';
import ImageCardItem from './image-card-item';
import ImageIconItem from './image-icon-item';
import QuestionAnswerItem from './question-answer-item';

function RenderSectionContent({ jsonItems }) {
    try {
        const items = jsonItems ? JSON.parse(jsonItems) : [];
        return (
            <div className={`${items[0].image || items[0].icon ? 'grid grid-cols-1 gap-12 md:grid-cols-3' : 'flex flex-col gap-4'}`}>
                {items.map((item: any, idx: number) =>
                    item.img_icon || item.question ? (
                        item.question ? (
                            <QuestionAnswerItem key={idx} question={item.question} answer={item.answer} idx={idx} />
                        ) : (
                            <ImageIconItem key={idx} img_icon={item.img_icon} title={item.title} subtitle={item.subtitle} />
                        )
                    ) : item.image ? (
                        <ImageCardItem key={idx} image={item.image} title={item.title} subtitle={item.subtitle} text={item.text} />
                    ) : (
                        <IconCardItem key={idx} icon={item.icon} title={item.title} text={item.subtitle.substring(0, 80)} />
                    ),
                )}
            </div>
        );
    } catch {
        return <p className="text-sm text-[var(--destructive)]">Invalid JSON content</p>;
    }
}

export default RenderSectionContent;
