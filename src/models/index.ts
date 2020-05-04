

export interface Message {
  id: string, 
  text: string,
  public: boolean,
  mode?: string,
  source?: string,
  url?: string,
};