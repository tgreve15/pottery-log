import { makeStore } from "../store";
import { StorageWriter } from "../../utils/sync";
import { loadInitial } from "../../thunks/loadInitial";
import { newPot } from "../../models/Pot";

jest.mock("../../utils/sync", () => ({
  StorageWriter: {
    put: jest.fn(),
    delete: jest.fn()
  }
}));

jest.mock("expo-file-system", () => ({
  makeDirectoryAsync: jest.fn(() => Promise.resolve())
}));
jest.mock("expo-constants");
jest.mock("react-native-appearance");

describe("store", () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it("persists pots", async () => {
    store = makeStore();
    jest.useFakeTimers();
    await store.dispatch(loadInitial());
    expect(StorageWriter.put).not.toHaveBeenCalled();
    store.dispatch({
      type: "new",
      pot: newPot()
    });
    jest.runAllTimers();
    expect(StorageWriter.put).toHaveBeenCalledWith("@Pots", expect.anything());
  });

  it("persists images", async () => {
    const store = makeStore();
    jest.useFakeTimers();
    await store.dispatch(loadInitial());
    expect(StorageWriter.put).not.toHaveBeenCalled();
    await store.dispatch({
      type: "image-add",
      potId: "1",
      localUri: "image.jpg"
    });
    jest.runAllTimers();
    expect(StorageWriter.put).toHaveBeenCalledWith(
      "@ImageStore",
      expect.anything()
    );
  });

  it("persists import", async () => {
    const store = makeStore();
    jest.useFakeTimers();

    await store.dispatch(loadInitial());
    jest.runAllTimers();
    expect(StorageWriter.put).not.toHaveBeenCalled();

    await store.dispatch({
      type: "import-resume",
      data: { importing: true }
    });
    jest.runAllTimers();
    expect(StorageWriter.put).not.toHaveBeenCalled();

    await store.dispatch({
      type: "import-resume-affirm"
    });
    jest.runAllTimers();
    expect(StorageWriter.put).toHaveBeenCalledWith(
      "@Import",
      expect.anything()
    );

    await store.dispatch({
      type: "import-cancel"
    });
    jest.runAllTimers();
    expect(StorageWriter.delete).toHaveBeenCalledWith("@Import");
  });
});
