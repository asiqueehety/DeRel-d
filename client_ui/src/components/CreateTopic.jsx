import React, {useRef} from "react";

export default function CreateTopic() {

  // const formRef = useRef();

  // function handleSubmit(event) 
  // {
  //   event.preventDefault(); // Prevent the default form submission behavior
  //   const formData = new FormData(formRef.current); // Create a FormData object from the form

  //   // Send the form data to the server using fetch or any other method
  //   fetch("/createTopic", {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Success:", data);
  //       // Handle success (e.g., show a success message, redirect, etc.)
  //       formRef.current.reset();
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       // Handle error (e.g., show an error message)
  //     });
  // }
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
