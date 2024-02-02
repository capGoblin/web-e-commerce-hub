import React, { FC } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Product {
  title: string;
  imgSrc: string;
  price: string;
}

interface Site {
  id: number;
  name: string;
  products: Product[];
}

interface MyComponentProps {
  sites: Site[];
}

export const Component: FC<MyComponentProps> = ({ sites }) => {
  return (
    <div>
      {sites.map((site) => (
        <div key={site.id}>
          <h2>{site.name}</h2>
          {site.products.map((product, index) => (
            <div key={index}>
              <h3>{product.title}</h3>
              <img src={product.imgSrc} alt={product.title} />
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
    // <div key="1" className="flex flex-col min-h-screen">
    //   <header className="flex h-14 items-center border-b px-4 md:px-6">
    //     <div className="flex w-full items-center gap-4 md:gap-6">
    //       <Link className="flex items-center gap-2" href="#">
    //         <MountainIcon className="h-6 w-6" />
    //         <span className="text-lg font-semibold">Acme Inc</span>
    //       </Link>
    //       <form className="flex-1 ml-auto">
    //         <div className="relative">
    //           <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
    //           <Input
    //             className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
    //             placeholder="Search products..."
    //             type="search"
    //           />
    //         </div>
    //       </form>
    //       <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
    //         <BellIcon className="h-4 w-4" />
    //         <span className="sr-only">Toggle notifications</span>
    //       </Button>
    //     </div>
    //   </header>
    //   <main className="flex-1 p-4 md:p-6">
    //     <div className="flex flex-col gap-4">
    //       <div className="border rounded-lg p-4">
    //         <h2 className="text-lg font-semibold">Site 1</h2>
    //         <div className="flex gap-4 mt-4 overflow-x-auto">
    //           <Button className="self-center">
    //             <ArrowLeftIcon className="h-4 w-4" />
    //           </Button>
    //           <div className="grid gap-2">
    //             <img
    //               alt="Product 1"
    //               className="aspect-square object-cover rounded-md"
    //               height="200"
    //               src="/placeholder.svg"
    //               width="200"
    //             />
    //             <h3 className="font-semibold">Product 1</h3>
    //             <p className="text-sm text-gray-500 dark:text-gray-400">
    //               $99.99
    //             </p>
    //             <Button>Add to Cart</Button>
    //           </div>
    //           <div className="grid gap-2">
    //             <img
    //               alt="Product 2"
    //               className="aspect-square object-cover rounded-md"
    //               height="200"
    //               src="/placeholder.svg"
    //               width="200"
    //             />
    //             <h3 className="font-semibold">Product 2</h3>
    //             <p className="text-sm text-gray-500 dark:text-gray-400">
    //               $89.99
    //             </p>
    //             <Button>Add to Cart</Button>
    //           </div>
    //           <div className="grid gap-2">
    //             <img
    //               alt="Product 3"
    //               className="aspect-square object-cover rounded-md"
    //               height="200"
    //               src="/placeholder.svg"
    //               width="200"
    //             />
    //             <h3 className="font-semibold">Product 3</h3>
    //             <p className="text-sm text-gray-500 dark:text-gray-400">
    //               $79.99
    //             </p>
    //             <Button>Add to Cart</Button>
    //           </div>
    //           <div className="grid gap-2">
    //             <img
    //               alt="Product 4"
    //               className="aspect-square object-cover rounded-md"
    //               height="200"
    //               src="/placeholder.svg"
    //               width="200"
    //             />
    //             <h3 className="font-semibold">Product 4</h3>
    //             <p className="text-sm text-gray-500 dark:text-gray-400">
    //               $69.99
    //             </p>
    //             <Button>Add to Cart</Button>
    //           </div>
    //           <div className="grid gap-2">
    //             <img
    //               alt="Product 5"
    //               className="aspect-square object-cover rounded-md"
    //               height="200"
    //               src="/placeholder.svg"
    //               width="200"
    //             />
    //             <h3 className="font-semibold">Product 5</h3>
    //             <p className="text-sm text-gray-500 dark:text-gray-400">
    //               $59.99
    //             </p>
    //             <Button>Add to Cart</Button>
    //           </div>
    //           <Button className="self-center">
    //             <ArrowRightIcon className="h-4 w-4" />
    //           </Button>
    //         </div>
    //       </div>
    //       <div className="border rounded-lg p-4">
    //         <h2 className="text-lg font-semibold">Site 2</h2>
    //         <div className="flex gap-4 mt-4 overflow-x-auto">
    //           <Button className="self-center">
    //             <ArrowLeftIcon className="h-4 w-4" />
    //           </Button>
    //           <div className="grid gap-2">
    //             <img
    //               alt="Product 1"
    //               className="aspect-square object-cover rounded-md"
    //               height="200"
    //               src="/placeholder.svg"
    //               width="200"
    //             />
    //             <h3 className="font-semibold">Product 1</h3>
    //             <p className="text-sm text-gray-500 dark:text-gray-400">
    //               $299.99
    //             </p>
    //             <Button>Add to Cart</Button>
    //           </div>
    //           <div className="grid gap-2">
    //             <img
    //               alt="Product 2"
    //               className="aspect-square object-cover rounded-md"
    //               height="200"
    //               src="/placeholder.svg"
    //               width="200"
    //             />
    //             <h3 className="font-semibold">Product 2</h3>
    //             <p className="text-sm text-gray-500 dark:text-gray-400">
    //               $289.99
    //             </p>
    //             <Button>Add to Cart</Button>
    //           </div>
    //           <div className="grid gap-2">
    //             <img
    //               alt="Product 3"
    //               className="aspect-square object-cover rounded-md"
    //               height="200"
    //               src="/placeholder.svg"
    //               width="200"
    //             />
    //             <h3 className="font-semibold">Product 3</h3>
    //             <p className="text-sm text-gray-500 dark:text-gray-400">
    //               $279.99
    //             </p>
    //             <Button>Add to Cart</Button>
    //           </div>
    //           <div className="grid gap-2">
    //             <img
    //               alt="Product 4"
    //               className="aspect-square object-cover rounded-md"
    //               height="200"
    //               src="/placeholder.svg"
    //               width="200"
    //             />
    //             <h3 className="font-semibold">Product 4</h3>
    //             <p className="text-sm text-gray-500 dark:text-gray-400">
    //               $269.99
    //             </p>
    //             <Button>Add to Cart</Button>
    //           </div>
    //           <div className="grid gap-2">
    //             <img
    //               alt="Product 5"
    //               className="aspect-square object-cover rounded-md"
    //               height="200"
    //               src="/placeholder.svg"
    //               width="200"
    //             />
    //             <h3 className="font-semibold">Product 5</h3>
    //             <p className="text-sm text-gray-500 dark:text-gray-400">
    //               $259.99
    //             </p>
    //             <Button>Add to Cart</Button>
    //           </div>
    //           <Button className="self-center">
    //             <ArrowRightIcon className="h-4 w-4" />
    //           </Button>
    //         </div>
    //       </div>
    //       <div className="border rounded-lg p-4">
    //         <h2 className="text-lg font-semibold">Site 3</h2>
    //         <div className="flex gap-4 mt-4 overflow-x-auto">
    //           <Button className="self-center">
    //             <ArrowLeftIcon className="h-4 w-4" />
    //           </Button>
    //           <div className="grid gap-2">
    //             <img
    //               alt="Product 1"
    //               className="aspect-square object-cover rounded-md"
    //               height="200"
    //               src="/placeholder.svg"
    //               width="200"
    //             />
    //             <h3 className="font-semibold">Product 1</h3>
    //             <p className="text-sm text-gray-500 dark:text-gray-400">
    //               $499.99
    //             </p>
    //             <Button>Add to Cart</Button>
    //           </div>
    //           <div className="grid gap-2">
    //             <img
    //               alt="Product 2"
    //               className="aspect-square object-cover rounded-md"
    //               height="200"
    //               src="/placeholder.svg"
    //               width="200"
    //             />
    //             <h3 className="font-semibold">Product 2</h3>
    //             <p className="text-sm text-gray-500 dark:text-gray-400">
    //               $489.99
    //             </p>
    //             <Button>Add to Cart</Button>
    //           </div>
    //           <div className="grid gap-2">
    //             <img
    //               alt="Product 3"
    //               className="aspect-square object-cover rounded-md"
    //               height="200"
    //               src="/placeholder.svg"
    //               width="200"
    //             />
    //             <h3 className="font-semibold">Product 3</h3>
    //             <p className="text-sm text-gray-500 dark:text-gray-400">
    //               $479.99
    //             </p>
    //             <Button>Add to Cart</Button>
    //           </div>
    //           <div className="grid gap-2">
    //             <img
    //               alt="Product 4"
    //               className="aspect-square object-cover rounded-md"
    //               height="200"
    //               src="/placeholder.svg"
    //               width="200"
    //             />
    //             <h3 className="font-semibold">Product 4</h3>
    //             <p className="text-sm text-gray-500 dark:text-gray-400">
    //               $469.99
    //             </p>
    //             <Button>Add to Cart</Button>
    //           </div>
    //           <div className="grid gap-2">
    //             <img
    //               alt="Product 5"
    //               className="aspect-square object-cover rounded-md"
    //               height="200"
    //               src="/placeholder.svg"
    //               width="200"
    //             />
    //             <h3 className="font-semibold">Product 5</h3>
    //             <p className="text-sm text-gray-500 dark:text-gray-400">
    //               $459.99
    //             </p>
    //             <Button>Add to Cart</Button>
    //           </div>
    //           <Button className="self-center">
    //             <ArrowRightIcon className="h-4 w-4" />
    //           </Button>
    //         </div>
    //       </div>
    //     </div>
    //   </main>
    // </div>
  );
};

function ArrowLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function BellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
