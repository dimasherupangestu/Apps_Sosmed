import { Store } from "../store/store";

export type RootType = ReturnType<typeof Store.getState>;
