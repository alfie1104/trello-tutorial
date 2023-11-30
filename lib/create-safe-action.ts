import { z } from "zod";

export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>; //클라이언트서버에서 보낸 입력 파라미터에 대한 오류
  error?: string | null; //서버에서 발생한 오류
  data?: TOutput; //성공시 클라이언트로 전달될 데이터
};

//입력 매개변수 데이터의 유효성을 검사하고, 유효성 검사가 성공하면 제공된 핸들러를 호출하여 결과를 반환하는 '안전한 액션 함수'를 생성하는 것이 목적
//코드의 안전성을 높이고 에러를 미리 방지가능
export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validationResult = schema.safeParse(data);

    if (!validationResult.success) {
      return {
        fieldErrors: validationResult.error.flatten()
          .fieldErrors as FieldErrors<TInput>,
      };
    }

    return handler(validationResult.data);
  };
};
