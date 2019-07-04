import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { useTranslation } from "react-i18next";
import { IState } from "../../store";
import {
  fetchTags,
  updateTag,
  deleteTag
} from "../../store/modules/tag/tag.action";
import { ITag } from "../../store/modules/tag/tag.interface";
import { PageHeader } from "../../components/PageHeader";
import { CreateUser } from "./CreateTag";
import { TagTable } from "./TagTable";

const mapStateToProps = (state: IState) => ({
  loading: state.loading.loading,
  tags: state.tag.tags
});

const mapDispatchToProps = (dispath: Dispatch<AnyAction>) =>
  bindActionCreators({ fetchTags, updateTag, deleteTag }, dispath);

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    fetchUsers: Function;
    tags?: ITag[];
  };

const UsersComponent: React.FC<Props> = props => {
  const { t } = useTranslation();
  const { tags, loading, fetchTags, updateTag, deleteTag } = props;

  useEffect(() => {
    console.log("组件装载");
    fetchTags();

    return () => {
      console.log("组件卸载");
    };
  }, [fetchTags]);

  return (
    <>
      <PageHeader title={t("tagManager")} />
      <div style={{ background: "#fff", padding: 15 }}>
        <CreateUser />
        <TagTable
          loading={loading}
          tags={tags}
          updateTag={updateTag}
          deleteTag={deleteTag}
        />
      </div>
    </>
  );
};

export const TagManager = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersComponent);