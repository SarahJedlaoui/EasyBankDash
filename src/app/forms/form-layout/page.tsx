import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import SelectGroupOne from "@/components/FormElements/SelectGroup/SelectGroupOne";
import SelectGrouptwo from "@/components/FormElements/SelectGroup/SelectGroupTwo";
import SelectGroupThree from "@/components/FormElements/SelectGroup/SelectGroupThree";

import Link from "next/link";
import InputGroup from "@/components/FormElements/InputGroup";

export const metadata: Metadata = {
  title: "Next.js Form Layout Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Form Layout page for NextAdmin Dashboard Kit",
};

const FormLayout = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Form Layout" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-semibold text-dark dark:text-white">
                Create New Admin
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                  <InputGroup
                    label="First name"
                    type="text"
                    placeholder="Enter first name"
                    customClasses="w-full xl:w-1/2"
                  />

                  <InputGroup
                    label="Last name"
                    type="text"
                    placeholder="Enter last name"
                    customClasses="w-full xl:w-1/2"
                  />
                </div>

                <InputGroup
                  label="Email"
                  type="email"
                  placeholder="Enter email address"
                  customClasses="mb-4.5"
                  required
                />
                <InputGroup
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  customClasses="mb-4.5"
                  required
                />

                <SelectGroupThree />

                <button className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
                  Create 
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Sign In Form --> */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-semibold text-dark dark:text-white">
                Add New Leoni User
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <InputGroup
                  label="Phone number"
                  type="text"
                  placeholder="Enter Phone number"
                  customClasses="mb-4.5"
                />

                <InputGroup
                  label="Matricule"
                  type="text"
                  placeholder="Enter Matricule"
                />

               

                <button className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
                  Create
                </button>
              </div>
            </form>
          </div>

          {/* <!-- Sign Up Form --> */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-semibold text-dark dark:text-white">
                Reset Password Form
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">

                <InputGroup
                  label="Email"
                  type="email"
                  placeholder="Enter email address"
                  customClasses="mb-4.5"
                />

                <InputGroup
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  customClasses="mb-4.5"
                />

                <InputGroup
                  label="Re-type Password"
                  type="password"
                  placeholder="Re-enter"
                  customClasses="mb-5.5"
                />

                <button className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
                  Resset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;
