import { FC } from "react";

type Props = {};

export const CreateProduct: FC<Props> = (props) => {
  return (
    <main className="flex flex-1 flex-col">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-semibold text-lg md:text-2xl">Create product</h1>
      </div>
      <div className="w-full border shadow rounded mb-4">hello</div>
    </main>
  );
};

export default CreateProduct;
