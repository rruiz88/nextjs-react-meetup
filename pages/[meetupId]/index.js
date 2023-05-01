import { Fragment } from "react";
import { MongoClient } from "mongodb";

function MeetupDetails(props) {
  return (
    <Fragment>
      <img src={props.image} alt={props.title} />
      <h1>First</h1>
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://admin:029513Ac!@cluster0.nqyvo39.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://admin:029513Ac!@cluster0.nqyvo39.mongodb.net/meetupsretryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({ _id: meetupId });

  client.close();

  return {
    props: {
      meetupData: selectedMeetup,
    },
  };
}

export default MeetupDetails;
