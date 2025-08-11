import axios from "axios";

import { URLS } from "../constants/constants";

export const axiosClient = axios.create({ baseURL: URLS.baseUrl });
