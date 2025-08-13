import { useNavigate } from "@tanstack/react-router";

import { useEffect } from "react";

import { useUser } from "../../entities/user/model/store/user-store";
import { CreatePost } from "../../features/add-post/ui/create-post";

export const CreatePostPage = () => {
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate({ to: "/" });
    }
  }, [user]);

  return (
    <div>
      <CreatePost />
    </div>
  );
};
