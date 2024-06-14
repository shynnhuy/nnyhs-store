"use client";
import { useLoginMutation } from "@/mutations/auth";
import { useStore } from "@/store";
import clsx from "@/utils/clsx";
import { kanit } from "@/utils/fonts";
import {
  Button,
  Form,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Modal,
  ModalContent,
  buttonVariants,
  useToast,
} from "@ui/components";
import { cn } from "@ui/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import styled from "styled-components";
import { Icons } from "../Icons";
import { create } from "zustand";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type PopupState = {
  open: boolean;
};

type PopupActions = {
  onChangeModal: (state: boolean) => void;
  openModal: () => void;
  closeModal: () => void;
};

export type PopupSlide = PopupState & PopupActions;

const initialState: PopupState = {
  open: false,
};

export const useAuthModal = create<PopupSlide>((set) => ({
  ...initialState,
  onChangeModal: (open) => set({ open }),
  openModal: () => set({ open: true }),
  closeModal: () => set({ open: false }),
}));

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const StyledModal = styled(Modal)`
  width: 100%;
  max-width: 500px;

  .ant-modal-content {
    padding: 0;
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
  const { toast } = useToast();
  const { open, onChangeModal, closeModal } = useAuthModal();
  const { loggedIn } = useStore();
  const { mutate, isPending } = useLoginMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onFinish = (state: z.infer<typeof formSchema>) => {
    mutate(state, {
      onSuccess: async ({ data }) => {
        loggedIn(data.result);
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
        closeModal();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.response?.data?.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <StyledModal open={open} onOpenChange={onChangeModal}>
      <ModalContent>
        <Form {...form}>
          <div className="flex flex-col">
            <div className="title font-semibold">
              Welcome to{" "}
              <span className={clsx(kanit.className, "logo")}>Store</span>
            </div>
            <div className="text-center text-muted-foreground text-[12px] font-semibold">
              Login with email & password
            </div>
            <form
              className="login-wrapper space-y-4"
              onSubmit={form.handleSubmit(onFinish)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Input
                      placeholder="example@gmail.com"
                      type="email"
                      {...field}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <Input placeholder="********" type="password" {...field} />
                  </FormItem>
                )}
              />
              <Button loading={isPending} className="w-full" type="submit">
                Login
              </Button>
            </form>
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
            <Link
              className={cn(
                buttonVariants({ variant: "default" }),
                "mt-4 bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
              )}
              target="_blank"
              href="http://localhost:3100/api/v1/auth/github"
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.Github className="mr-2 h-4 w-4" />
              )}{" "}
              Github
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
      </ModalContent>
    </StyledModal>
  );

  // return (
  //   <StyledModal
  //     centered
  //     open={open}
  //     onCancel={closeModal}
  //     footer={null}
  //     title={null}
  //   >
  //     <Form
  //       form={form}
  //       onFinish={onFinish}
  //       className="login-wrapper"
  //       layout="vertical"
  //     >
  //       <div className="flex flex-col">
  //         <div className="title font-semibold">
  //           Welcome to{" "}
  //           <span className={clsx(kanit.className, "logo")}>Store</span>
  //         </div>
  //         <div className="text-center text-muted-foreground text-[12px] font-semibold">
  //           Login with email & password
  //         </div>
  //         <FormItem label="Email" name="email">
  //           <Input
  //             placeholder="example@gmail.com"
  //             type="email"
  //             name="email"
  //             required
  //             size="large"
  //           />
  //         </FormItem>
  //         <FormItem label="Password" name="password">
  //           <Input
  //             placeholder="********"
  //             type="password"
  //             name="password"
  //             required
  //             size="large"
  //           />
  //         </FormItem>
  //         <Button loading={isPending} className="submit" type="submit">
  //           Login
  //         </Button>
  //         <div className="relative mt-4">
  //           <div className="absolute inset-0 flex items-center">
  //             <span className="w-full border-t" />
  //           </div>
  //           <div className="relative flex justify-center text-xs uppercase">
  //             <span className="bg-background px-2 text-muted-foreground">
  //               Or continue with
  //             </span>
  //           </div>
  //         </div>
  //         <Link
  //           className={cn(buttonVariants({ variant: "destructive" }), "mt-4")}
  //           target="_blank"
  //           href="http://localhost:3100/api/v1/auth/google"
  //         >
  //           {isPending ? (
  //             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  //           ) : (
  //             <Icons.Google className="mr-2 h-4 w-4" />
  //           )}{" "}
  //           Google
  //         </Link>

  //         <div className="text-center text-muted-foreground text-[12px] font-semibold mt-[19px] mb-[19px]">
  //           Don&apos;t have an account?{" "}
  //           <span className="text-primary font-semibold">Register</span>
  //         </div>
  //       </div>
  //     </Form>

  //     <div className="footer">
  //       <div className="text-center text-muted-foreground text-[12px] font-semibold">
  //         Forgot your password? <a href="#">Reset here</a>
  //       </div>
  //     </div>
  //   </StyledModal>
  // );
};
