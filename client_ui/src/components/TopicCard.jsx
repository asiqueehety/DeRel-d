export default function TopicCard(props) 
{
    return (
        <div id="topicCard">
            <img src={props.image} alt="Topic" id="topicCardImg" />
            <div id="topicCardContent">
                <h2 id="topicCardTitle">{props.title}</h2>
                <p id="topicCardDescription">{props.description.slice(0,200)+" ..."}</p>
                <p id="topicCardHashtags">{props.hashtags}</p>
            </div>
        </div>
    )};