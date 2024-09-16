import { envConfig } from "@/utils/envConfig";

export default function Home() {
  return (
    <div>
      <>{envConfig.apiUrl}</>
      <h1>Hello World</h1>
    </div>
  );
}
