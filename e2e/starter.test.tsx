import { getAdapter } from "axios";
import { device, element, by, expect } from "detox";
import { Keyboard } from "react-native";

describe("Example", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  // beforeEach(async () => {
  //   await device.reloadReactNative();
  // });
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
  });

  test("회원가입 버튼을 클릭해도 아무일도 일어나지 않는다.", async () => {
    await element(by.text("회원가입")).tap();
    await expect(element(by.text("Signup"))).toBeVisible();
  });

  test("이메일에 123@123, 비밀번호에 123, 비밀번호 확인에 123을 입력하고 회원가입을 클릭하면 로그인페이지로 이동한다.", async () => {
    await element(by.id("emailInput")).typeText("admin@google.com");
    await element(by.id("passwordInput")).typeText("password");
    await element(by.id("passwordConfirmInput")).typeText("password");
    await element(by.text("이메일로 회원가입")).tap();
    await element(by.text("회원가입")).tap();

    await expect(element(by.text("Login"))).toBeVisible();
  });

  test("이메일 비밀번호를 틀리게 입력하면 로그인이 안된다.", async () => {
    await element(by.id("loginEmail")).typeText("admin@naver.com");
    await element(by.id("pwdEmail")).typeText("passwordpassword");
    await element(by.text("이메일로 로그인")).tap();
    await element(by.text("로그인")).tap();

    await expect(element(by.text("Home"))).not.toBeVisible();
  });

  test("이메일과 비밀번호를 제대로 입력하면 로그인이 된다.", async () => {
    await element(by.text("OK")).tap();
    await element(by.id("loginEmail")).replaceText("admin@google.com");
    await element(by.id("pwdEmail")).replaceText("password");
    await element(by.text("이메일로 로그인")).tap();
    await element(by.text("로그인")).tap();

    await expect(element(by.text("Home"))).toBeVisible();
  });

  test("설정에 잘 들어가지고 뒤로도 가진다.", async () => {
    await element(by.id("setting-btn")).tap();
    await expect(element(by.text("Setting"))).toBeVisible();
    await device.pressBack();
    await expect(element(by.text("Home"))).toBeVisible();
  });

  test("주문에 잘 들어가진다.", async () => {
    await element(by.id("order-btn")).tap();
    await expect(element(by.text("Order"))).toBeVisible();
    await device.pressBack();
    await expect(element(by.text("Home"))).toBeVisible();
  });

  test("배달에 잘 들어가진다.", async () => {
    await element(by.id("delivery-btn")).tap();
    await expect(element(by.text("Delivery"))).toBeVisible();
    await device.pressBack();
    await expect(element(by.text("Home"))).toBeVisible();
  });

  test("스크롤도 잘된다.", async () => {
    await element(by.id("scrollViewId")).swipe("down", "slow");

    await element(by.id("scrollViewId")).swipe("up", "fast");
  });
});
