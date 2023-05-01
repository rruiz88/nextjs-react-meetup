import { Fragment } from "react";
import NewMeetUpForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";

function NewMeetPage() {
  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
  }

  return (
    <Fragment>
      <Head>
        <title>Add New React Meetups</title>
        <meta name="description" content="Add your own React meetups!" />
      </Head>
      <NewMeetUpForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetPage;
