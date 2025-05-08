// ignore the IDE warning about type checking
import { describe, test, expect } from "@jest/globals";

import { getAnthropicApiKey } from "../src/config";

describe("getAnthropicApiKey", () => {
  test(".envからAPIキーが取得できていることを確認する", () => {
    const apiKey = getAnthropicApiKey();
    // NOTE: .envに格納されている値は環境依存のため，取得が成功していることのみを確認する。
    expect(apiKey).not.toBeNull();
  });
});
