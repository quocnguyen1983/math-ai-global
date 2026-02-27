import { PLAN_LIMITS } from "./planLimits";

export function checkQuota(user: {
  plan: string;
  questionsUsed: number;
  tokensUsed: number;
}) {
  const limits = PLAN_LIMITS[user.plan as keyof typeof PLAN_LIMITS];

  if (!limits) {
    return { allowed: false, message: "Gói không hợp lệ" };
  }

  if (user.questionsUsed >= limits.questions) {
    return {
      allowed: false,
      message: "Bạn đã hết lượt sử dụng trong tháng",
    };
  }

  if (user.tokensUsed >= limits.tokens) {
    return {
      allowed: false,
      message: "Bạn đã hết token trong tháng",
    };
  }

  return { allowed: true };
}