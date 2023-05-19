export const pointRules = (rules: any, data: any) => {
  console.log({ rules });
  console.log({ data });
  if (+data.point < rules.point_rules.withdraw_with_condition) {
    return {
      isValid: false,
      message: `사용하려는 포인트 수는 더 커야 합니다 ${rules.point_rules.withdraw_with_condition.toLocaleString(
        "es-US"
      )}`,
    };
  }
  return { isValid: true, message: "" };
};
