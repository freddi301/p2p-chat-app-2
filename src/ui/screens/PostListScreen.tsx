import React from "react";
import { Virtuoso } from "react-virtuoso";
import { AccountId } from "../../domain/common/AccountId";
import { Button } from "../components/base/Button";
import { Clickable } from "../components/base/Clickable";
import { PostItem } from "../components/PostItem";
import { ControlButtonGroup } from "../components/reusable/ControlButtonGroup";
import { EmptyListPlaceholder } from "../components/reusable/EmptyListPlaceholder";
import { HeaderContentControlsLayout } from "../components/reusable/HeaderContentControlsLayout";
import { SimpleHeader } from "../components/reusable/SimpleHeader";
import { queries } from "../FrontendFacade";

type PostListScreenProps = {
  viewer: AccountId;
  author: AccountId;
};
export function PostListScreen({ viewer, author }: PostListScreenProps) {
  const postListSize = queries.PostListSize({ viewer, author });
  return (
    <HeaderContentControlsLayout
      header={<SimpleHeader>Posts</SimpleHeader>}
      content={
        postListSize === 0 ? (
          <EmptyListPlaceholder>No posts</EmptyListPlaceholder>
        ) : (
          <Virtuoso
            style={{ height: "100%" }}
            totalCount={postListSize}
            itemContent={(index) => <PostListItemMemo index={index} viewer={viewer} author={author} />}
          />
        )
      }
      controls={
        <ControlButtonGroup>
          <Button icon="Create" label="Create" onClick={() => alert("not implemented")} showLabel={false} />
        </ControlButtonGroup>
      }
    />
  );
}

type PostListItemProps = { index: number; viewer: AccountId; author: AccountId };
function PostListItem({ index, viewer, author }: PostListItemProps) {
  const id = queries.PostListAtIndex({ viewer, author, index });
  if (!id) throw new Error();
  return (
    <Clickable onClick={() => alert("not implemted")}>
      <PostItem viewer={viewer} author={author} createdAt={id.createdAt} />
    </Clickable>
  );
}
const PostListItemMemo = React.memo(PostListItem);
