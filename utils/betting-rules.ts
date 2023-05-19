export const bettingRules = (rules: any, level: string | number, data: any) => {
  console.log({ rules });
  console.log({ data });
  const rulesByLevel = rules?.betting_rules?.rules_by_level.find(
    (ruleByLevel: any) => ruleByLevel.level === level
  );
  console.log({ rulesByLevel });

  // Rule about max and min amount bet
  if (data.amount < rulesByLevel.min_bet) {
    return {
      isValid: false,
      message: `최소 금액은 ${rulesByLevel.min_bet}`,
    };
  }
  if (data.amount > rulesByLevel.max_bet) {
    return {
      isValid: false,
      message: `최대 금액은 ${rulesByLevel.max_bet}`,
    };
  }

  // Rule about item quanlity in betslip be bet
  if (data.betting.length > rules?.betting_rules.number_items_betslip) {
    return {
      idValid: false,
      message: `베팅 항목 수는 ${rules?.betting_rules?.number_items_betslip}`,
    };
  }

  // Rule about min odd bet be place bet
  if (
    data.betting.some(
      (bet: any) => bet.odds < rules?.betting_rules?.min_odd_bet
    )
  ) {
    return {
      isValid: false,
      message: `배당률이 ${rules?.betting_rules?.min_odd_bet}. 다시 시도하세요!`,
    };
  }

  // Rule about min amount bet when single bet
  if (
    data.betting.length < 2 &&
    data.amount > rulesByLevel.danpole_betting_amount
  ) {
    return {
      isValid: false,
      message: `한 번 베팅할 수 있는 최대 금액은 ${rulesByLevel.danpole_betting_amount}`,
    };
  }

  return { isValid: true, message: "" };
};
