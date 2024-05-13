"use client";
import { useLoginMutation } from "@/mutations/auth";
import clsx from "@/utils/clsx";
import { kanit } from "@/utils/fonts";
import { Button } from "@ui/components";
import { Form, Input, Modal, notification } from "antd";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import { cookies } from "next/headers";
import styled from "styled-components";
import { create } from "zustand";

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

type AuthPopupState = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useAuthPopup = create<AuthPopupState>((set) => ({
  open: false,
  openModal: () => set({ open: true }),
  closeModal: () => set({ open: false }),
}));

export const AuthPopup = () => {
  const [form] = Form.useForm<FormState>();
  const { open, closeModal } = useAuthPopup();
  const { mutate } = useLoginMutation();

  const onFinish = (state: FormState) => {
    mutate(state, {
      onSuccess: async (response) => {
        await axios.post("/api/auth", response);
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
          <Button className="submit" type="submit">
            Login
          </Button>

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
