"use client";

import { chatFormSchema, ScreenBaseModel } from "@/models";
import {
  useDeleteChatAiRepo,
  useGetHistoryChatRepo,
  useSendChatPromptRepo,
} from "@/repositories";
import React, { useEffect, useRef } from "react";
import styles from "./page.module.css";
import { ButtonComponent, TextInputComponent } from "@/components";
import { dateUtil, useHookForm } from "@/utils";

const Page: ScreenBaseModel = () => {
  const { control, handleSubmit, setValue } = useHookForm({
    schema: chatFormSchema,
    defaultValues: { chatText: "" },
  });
  const { messages, refetch, isFetching } = useGetHistoryChatRepo();
  const { sendChatPrompt, isPending: isLoadingSend } = useSendChatPromptRepo({
    onSuccess: () => setValue("chatText", ""),
  });
  const { deleteChatAi, isPending: isLoadingDelete } = useDeleteChatAiRepo();

  const ref = useRef<HTMLDivElement>(null);

  const onClickSend = handleSubmit(({ chatText }) => {
    sendChatPrompt({ prompt: chatText });
  });
  const onClickDeleteChatAi = (id: string) => () => deleteChatAi({ id });

  useEffect(() => {
    ref.current?.scrollTo({
      top: ref.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className={styles.container}>
      <h1>Chat</h1>

      <div className={styles.chatContainer}>
        <div ref={ref} className={styles.chatWrapper}>
          {messages?.map((mes) => {
            const isAI = mes.role === "ai";
            const backgroundColor = `var(--${isAI ? "primary" : "green"}300)`;

            return (
              <div
                key={mes.id}
                className={styles.chatBoxContainer}
                style={{ justifyContent: isAI ? "flex-start" : "flex-end" }}
              >
                {isAI && (
                  <div className={styles.avt}>
                    <h3>AI</h3>
                  </div>
                )}

                <div
                  className={styles.chatBoxWrapper}
                  style={{ backgroundColor }}
                >
                  <p>{mes.text}</p>

                  <p
                    className={styles.time}
                    style={{ textAlign: isAI ? "left" : "right" }}
                  >
                    {dateUtil.getDayTime(mes.createdAt)}
                  </p>

                  <ButtonComponent
                    title="Delete"
                    type="outline"
                    color="fail"
                    style={{ alignSelf: isAI ? "flex-start" : "flex-end" }}
                    onClick={onClickDeleteChatAi(mes.id)}
                    isLoading={isLoadingDelete}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.chatInputContainer}>
        <TextInputComponent
          control={control}
          name="chatText"
          placeholder="Aa..."
        />

        <ButtonComponent
          title={"Send"}
          onClick={onClickSend}
          isLoading={isLoadingSend}
        />

        <ButtonComponent
          title={"Refetch"}
          type="outline"
          onClick={refetch}
          isLoading={isFetching}
        />
      </div>
    </div>
  );
};

export default Page;
