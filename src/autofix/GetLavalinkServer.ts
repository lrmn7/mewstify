import { LavalinkDataType } from "../@types/Lavalink.js";
import axios from "axios";
import MarkdownIt from "markdown-it";
import { promises as fse } from "fs";

import { LoggerService } from "../services/LoggerService.js";
import Token from "markdown-it/lib/token.js";

export class GetLavalinkServer {
  logger: any;

  constructor() {
    this.logger = new LoggerService().init();
  }

  async execute(): Promise<LavalinkDataType[]> {
    try {
      const res = await axios.get(
        "https://raw.githubusercontent.com/DarrenOfficial/lavalink-list/master/docs/NoSSL/lavalink-without-ssl.md"
      );
      return this.getLavalinkServerInfo(res.data);
    } catch (error) {
      this.logger.error(`Failed to fetch Lavalink server info: ${error}`);
      return [];
    }
  }

  getLavalinkServerInfo(data: string): LavalinkDataType[] {
    const MdCodeTagFilter: string[] = [];
    const LavalinkCredentialsFilter: string[] = [];
    const FinalData: LavalinkDataType[] = [];

    const md = new MarkdownIt();
    const result = md.parse(data, "");

    result.forEach((data: Token) => {
      if (data.tag === "code") {
        MdCodeTagFilter.push(data.content);
      }
    });

    this.parseData(MdCodeTagFilter, LavalinkCredentialsFilter);
    this.commitData(LavalinkCredentialsFilter, FinalData);

    return FinalData;
  }

  parseBoolean(value: string): boolean {
    const trimmedValue = value.trim().toLowerCase();
    return trimmedValue === "true";
  }

  parseData(
    MdCodeTagFilter: string[],
    LavalinkCredentialsFilter: string[]
  ): void {
    MdCodeTagFilter.forEach((element: string) => {
      const res = element.replace(/\n/g, "").replace(/\s+/g, "");
      const filteredRes = res
        .replace(/Host|Port|Password|Secure/g, "")
        .replace(/[&/\\#,+()$~%'"*?<>{}]/g, "");

      LavalinkCredentialsFilter.push(filteredRes);
    });
  }

  commitData(
    LavalinkCredentialsFilter: string[],
    FinalData: LavalinkDataType[]
  ): void {
    LavalinkCredentialsFilter.forEach((element: string) => {
      const regexExtract =
        /:(.{0,99999}):([0-9]{0,99999}):(.{0,99999}):(false|true)/;
      const res = regexExtract.exec(element);

      if (res) {
        const [, host, portStr, pass, secureStr] = res;
        const port = parseInt(portStr, 10);
        const secure = this.parseBoolean(secureStr);

        FinalData.push({
          host,
          port,
          pass,
          secure,
          name: `${host}:${port}`,
          online: false,
        });
      }
    });
  }
}
