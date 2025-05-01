import React from "react";

export default function CreateTopic() {

  return (
    <div>
      <form action="/createTopic" method="post" id="createTopicForm">
        <input type="text" placeholder="Add Title" name="title" id="createTopicTitle"/>
        <input type="file" placeholder="Add Image" accept="image/*" name="image" id="createTopicImg" />
        <textarea type="text" placeholder="Add description" name="description" id="createTopicDesc"></textarea>
        <input type="text" placeholder="Add Hashtags" name="hashtags" id="createTopicHashtags"/>
        <button type="submit" id="createTopicSubmit">Submit</button>
      </form>
    </div>
  );
}
