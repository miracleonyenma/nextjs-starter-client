"use client";

import { UpdateUserInput, User } from "@/types/gql/graphql";
import updateUser from "@/utils/user/updateUser";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import Loader from "@/components/Loader";
import Image from "next/image";
import uploadToCloudinary from "@/utils/cloudinary/uploadToCloudinary";
import useAuth from "@/hooks/useAuth";
import { logger } from "@untools/logger";

const ProfileForm: React.FC<{ user?: User }> = ({ user }) => {
  const { handleGetMe } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<User | undefined>(user);
  const [preview, setPreview] = useState<string>("" + userData?.picture || "");
  const [file, setFile] = useState<File | null>(null);

  const formik = useFormik<User>({
    initialValues: {
      picture: userData?.picture,
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values) => {
      console.log({ values });
      if (file) {
        toast.promise(uploadToCloudinary(file), {
          loading: (() => {
            setLoading(true);
            console.log(preview);

            return "Uploading...";
          })(),
          success: (data) => {
            console.log("🪵🪵🪵🪵🪵🪵🪵🪵 ~ uploadToCloudinary ~ data", data);
            setPreview(data.secure_url);
            setUserData({ ...userData, picture: data.secure_url });
            formik.setFieldValue("picture", data.secure_url);
            handleUpdateUser({ ...values, picture: data.secure_url });

            return "Uploaded Successfully";
          },
          error: (error) => {
            return error.message;
          },
          finally: () => {
            setLoading(false);
          },
        });
      } else {
        handleUpdateUser(values);
      }
    },
  });

  const handleUpdateUser = (values: UpdateUserInput) => {
    toast.promise(updateUser(values), {
      loading: (() => {
        setLoading(true);
        return "Updating User...";
      })(),
      success: (data) => {
        console.log("🪵🪵🪵🪵🪵 ~ handleAuth Register:", data);
        if (data?.updateUser) setUserData(data?.updateUser);
        return "User Updated Successfully";
      },
      error: (error) => {
        return error.message;
      },
      finally: () => {
        setLoading(false);
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first selected file
    if (file) setFile(file); // Set the selected file
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = () => {
        setPreview(reader.result as string); // Set the image preview URL
        setUserData({ ...userData, picture: reader.result as string });
      };

      reader.readAsDataURL(file); // Read the file as a Data URL
    } else {
      setPreview(""); // Reset if no file or not an image
    }
  };

  const handleGetUser = useCallback(async () => {
    const user = await handleGetMe();
    if (user) {
      setUserData(user);
      formik.setValues({
        picture: user?.picture,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
      });
    }
  }, [formik, handleGetMe]);

  useEffect(() => {
    if (!userData && !user) {
      logger.log("running handleGetUser");
      handleGetUser();
    }
  }, [handleGetUser, user, userData]);
  return userData ? (
    <form onSubmit={formik.handleSubmit}>
      <div className="wrapper flex w-full max-w-5xl flex-col gap-4">
        {/* profile picture file input */}
        <div className="form-control flex grow flex-col gap-2">
          {/* preview image */}
          {userData?.picture && (
            <div className="flex flex-col items-start gap-2">
              <Image
                src={userData?.picture}
                alt={userData?.firstName || "Profile Picture"}
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
          )}
          <div className="form-control flex grow flex-col gap-2">
            <label htmlFor="firstName">Profile Picture</label>
            <div className="form-input">
              <input
                type="file"
                className="form-input"
                onChange={handleChange}
              />
            </div>
            {formik.touched.picture && formik.errors.picture ? (
              <div className="form-error">
                {/* <Danger variant="Bulk" className="icon h-4 w-4" /> */}
                <span className="dark:text-red-200">
                  {formik.errors.picture}
                </span>
              </div>
            ) : null}
          </div>
        </div>
        <div className="form-group flex flex-wrap gap-4">
          <div className="form-control flex grow flex-col gap-2">
            <label htmlFor="firstName">First Name</label>
            <div className="form-input">
              <input
                aria-label="First Name"
                id="firstName"
                type="text"
                placeholder="First Name"
                className="form-input"
                {...formik.getFieldProps("firstName")}
              />
            </div>
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="form-error">
                {/* <Danger variant="Bulk" className="icon h-4 w-4" /> */}
                <span className="dark:text-red-200">
                  {formik.errors.firstName}
                </span>
              </div>
            ) : null}
          </div>
          <div className="form-control flex grow flex-col gap-2">
            <label htmlFor="lastName">Last Name</label>
            <div className="form-input">
              <input
                aria-label="Last Name"
                id="lastName"
                type="text"
                placeholder="Last Name"
                className="form-input"
                {...formik.getFieldProps("lastName")}
              />
            </div>
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="form-error">
                {/* <Danger variant="Bulk" className="icon h-4 w-4" /> */}
                <span className="dark:text-red-200">
                  {formik.errors.lastName}
                </span>
              </div>
            ) : null}
          </div>
        </div>
        <div className="form-control flex grow flex-col gap-2">
          <label htmlFor="firstName">Email</label>
          <div className="form-input">
            <input
              readOnly
              aria-label="Email"
              id="email"
              type="email"
              placeholder="Email"
              className="form-input"
              {...formik.getFieldProps("email")}
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div className="form-error">
              {/* <Danger variant="Bulk" className="icon h-4 w-4" /> */}
              <span className="dark:text-red-200">{formik.errors.email}</span>
            </div>
          ) : null}
        </div>
        <div className="action-cont">
          <button disabled={loading} className="btn primary grow">
            <span>{loading ? "Updating..." : "Update"}</span>
            <Loader loading={loading} />
          </button>
        </div>
      </div>
    </form>
  ) : (
    <Loader loading={true} />
  );
};

export default ProfileForm;
