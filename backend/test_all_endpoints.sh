#!/bin/bash
for ep in health v3/products v3/ai-engineers v3/agents v3/commissions v3/payments v3/withdrawals v3/tree v3/academic-events v3/documents v3/admin/config v3/bank; do
  code=$(curl -sw '%{http_code}' -o /dev/null "http://localhost:8080/eepip-api/api/${ep}")
  printf '%-25s %s\n' "${ep}" "${code}"
done
