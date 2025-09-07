import api from "@/lib/apiCall";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BiLoader } from "react-icons/bi";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const [loading, setLoading] = useState(false);

  const submitPasswordHandler = async (data) => {
    try {
      setLoading(true);

      const { data: res } = await api.put("/user/change-password", data);

      if (res?.status === "success") {
        toast.success(res?.message);
      }
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10">
      <form onSubmit={handleSubmit(submitPasswordHandler)}>
        <div className="">
          <p className="text-xl font-bold text-black dark:text-white mb-1">
            Change Password
          </p>
          <span className="labelStyles">
            This will be used to log into your account and complete high
            severity actions.
          </span>

          <div className="mt-6 space-y-6">
            <Input
              type="password"
              name="currentPassword"
              label="Current Password"
              register={register("currentPassword", {
                required: "Current Password is required",
              })}
              error={
                errors.currentPassword ? errors.currentPassword.message : ""
              }
            />

            <Input
              type="password"
              disabled={loading}
              name="newPassword"
              label="New Password"
              register={register("newPassword", {
                required: "New Password is required",
              })}
              error={errors.newPassword ? errors.newPassword.message : ""}
            />

            <Input
              disabled={loading}
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              register={register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (val) => {
                  const { newPassword } = getValues();
                  return newPassword === val || "Passwords does not match!";
                },
              })}
              error={
                errors.confirmPassword ? errors.confirmPassword.message : ""
              }
              className="inputStyle"
            />
          </div>
        </div>
        <div className="flex items-center mt-10 gap-6 justify-center pb-10 border-b-2 border-gray-200 dark:border-gray-800">
                <Button
                  variant="outline"
                  loading={loading}
                  type="reset"
                  className="px-6 bg-transparent text-black dark:text-white border border-gray-200 dark:border-gray-700"
                >
                  Reset
                </Button>
        
                <Button
                  loading={loading}
                  type="submit"
                  className="px-8 bg-violet-800 text-white"
                >
                  {loading? <BiLoader className="animate-spin text-white"/>:"Change Password"}
                </Button>
              </div>
      </form>
    </div>
  );
};

export default ChangePassword;
