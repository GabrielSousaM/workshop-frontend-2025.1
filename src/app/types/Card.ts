export default interface Card {
  id: string;
  name: string;
  types: string[];
  images: {
    large: string;
  };
}