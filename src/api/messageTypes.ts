// В таком виде приходит с сервера
export type RawMessageT = {
  data: Record<string, unknown>;
};

// В таком виде хранится в Redux
export interface MessageT extends RawMessageT {
  time: string;
}
