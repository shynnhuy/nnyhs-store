"use client";
import { useLoginMutation } from "@/mutations/auth";
import clsx from "@/utils/clsx";
import { kanit } from "@/utils/fonts";
import { Button, buttonVariants } from "@ui/components";
import { cn } from "@ui/lib/utils";
import { Form, Input, Modal, notification } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import styled from "styled-components";
import { Icons } from "../Icons";
import { useAuthPopupStore } from "@/provider/auth-popup-provider";

type FormState = {
  email: string;
  password: string;
};

const StyledModal = styled(Modal)`
  &.ant-modal {
    width: 100%;
    max-width: 500px;

    .ant-modal-content {
      padding: 0;
    }
  }

  .login-wrapper {
    padding: 3rem 3.75rem 0px;
  }

  .footer {
    padding-block: 19px;
    background-color: rgb(243, 245, 249);
  }

  .title {
    text-align: center;
    font-size: 20px;
    .logo {
      font-style: italic;
      font-size: 24px;
      color: var(--primary);
    }
  }
`;

export const AuthPopup = () => {
  const [form] = Form.useForm<FormState>();
  const { open, closeModal } = useAuthPopupStore((state) => state);
  const { mutate, isPending } = useLoginMutation();

  // const loginWithGoogle = async () => {
  //   await APIService.get("/auth/google");
  // };

  const onFinish = (state: FormState) => {
    mutate(state, {
      onSuccess: async () => {
        // await axios.post("/api/auth", response);
        notification.success({
          message: "Success",
          description: "Logged in successfully",
        });
      },
      onError: (error) => {
        notification.error({
          message: "Error",
          description: error.response?.data?.message,
        });
      },
    });
  };
  return (
    <StyledModal
      centered
      open={open}
      onCancel={closeModal}
      footer={null}
      title={null}
    >
      <Form
        form={form}
        onFinish={onFinish}
        className="login-wrapper"
        layout="vertical"
      >
        <div className="flex flex-col">
          <div className="title font-semibold">
            Welcome to{" "}
            <span className={clsx(kanit.className, "logo")}>Store</span>
          </div>
          <div className="text-center text-muted-foreground text-[12px] font-semibold">
            Login with email & password
          </div>
          <FormItem label="Email" name="email">
            <Input
              placeholder="example@gmail.com"
              type="email"
              name="email"
              required
              size="large"
            />
          </FormItem>
          <FormItem label="Password" name="password">
            <Input
              placeholder="********"
              type="password"
              name="password"
              required
              size="large"
            />
          </FormItem>
          <Button loading={isPending} className="submit" type="submit">
            Login
          </Button>
          <div className="relative mt-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Link
            className={cn(buttonVariants({ variant: "destructive" }), "mt-4")}
            target="_blank"
            href="http://localhost:3100/api/v1/auth/google"
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.Google className="mr-2 h-4 w-4" />
            )}{" "}
            Google
          </Link>

          <div className="text-center text-muted-foreground text-[12px] font-semibold mt-[19px] mb-[19px]">
            Don&apos;t have an account?{" "}
            <span className="text-primary font-semibold">Register</span>
          </div>
        </div>
      </Form>

      <div className="footer">
        <div className="text-center text-muted-foreground text-[12px] font-semibold">
          Forgot your password? <a href="#">Reset here</a>
        </div>
      </div>
    </StyledModal>
  );
};
