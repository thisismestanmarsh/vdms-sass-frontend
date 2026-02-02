import { CreateDriverPage } from '../CreateDriverPage/CreateDriverPage';

// For now, we can reuse CreateDriverPage or create a specialized version
export const EditDriverPage = () => {
  // In a real app, we would fetch the driver data by ID and pass it to the form
  return <CreateDriverPage />;
};
