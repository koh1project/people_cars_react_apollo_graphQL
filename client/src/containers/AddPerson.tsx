import { CreatePersonForm } from "../components/forms/CreatePersonForm";
import { SecondaryHeading } from "../headings/SecondaryHeading";

export const AddPerson = () => {
  return (
    <>
      <SecondaryHeading text="Add Person" />
      <CreatePersonForm />
    </>
  );
};
