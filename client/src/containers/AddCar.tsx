import { CreateCarForm } from "../components/forms/CreateCarForm";
import { SecondaryHeading } from "../headings/SecondaryHeading";

export const AddCar = () => {
  return (
    <>
      <SecondaryHeading text="Add Car" />
      <CreateCarForm />
    </>
  );
};
