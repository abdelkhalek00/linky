import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner } from '@heroui/react'
import { deleteCommentApi } from '../../API_Requests/API_Requests'
import toastr from "toastr";
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../main'
export default function DropDownCommentComponent({ comment, handleUpdateComment, post }) {
    const { mutate: deleteComment,isPending } = useMutation({
        mutationFn: (commentId) => deleteCommentApi(commentId),
        onSuccess: () => {
            queryClient.invalidateQueries(['getPostComments', post.id])
            toastr.error("Comment Delete Success")
        }
    })
    return (
        <>
            {isPending ? <Spinner className='ms-4' /> :
                <Dropdown>
                    <DropdownTrigger>
                        <svg className="w-16 cursor-pointer outline-0" xmlns="http://www.w3.org/2000/svg"
                            width={27} height={27} viewBox="0 0 1 24" fill="none" stroke="#b0b0b0"
                            strokeWidth={2} strokeLinecap="square" strokeLinejoin="round">
                            <circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} /></svg>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Example with disabled actions" disabledKeys={[]}>
                        <DropdownItem key="edit" onClick={() => handleUpdateComment(comment)}>Edit comment</DropdownItem>
                        <DropdownItem key="delete" onClick={() => { deleteComment(comment._id) }} className="text-danger" color="danger">
                            Delete comment
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>}
        </>
    )
}
