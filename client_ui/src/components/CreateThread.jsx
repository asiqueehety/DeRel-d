import React, {useState} from "react";

export default function CreateThread(props)
{
    const [reply, setReply] = useState("");

    function handleSubmitClick(event)
    {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        fetch("/api/threads", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) throw new Error("Failed to create thread");
            return response.json();
        })
        .then(data => {
            console.log("Thread created successfully", data);

        })
        .catch(err => {
            console.error("Failed to create thread", err);
        });

        setReply("");
        const form = document.getElementById("createThread");
        form.reset();
        props.setThreadCount(props.threadCount + 1);
        props.setShowCreateThread(false);
        props.setShowThreads(true);
    }

    return(
        <form onSubmit={handleSubmitClick} id="createThread">
            <textarea name="reply" placeholder="Write a reply..." className="createTopicDesc" value={reply} onChange={(e) => setReply(e.target.value)}
            style={{height: "100px", width: "100%", resize: "none"}}
            required></textarea>
            <input type="hidden" name="post_id" value={props.post_id}/>
            <button className="btnn hacker" type="submit">Reply</button>
        </form>
    )
}