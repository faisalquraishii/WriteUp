import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

/*The post object is a prop passed to this component when it's used elsewhere in the application
(in EditPost.jsx, AddPost.jsx). It represents the data of a specific post and is used to pre-fill 
form fields when editing a post, update existing posts, create new posts, and display details of 
existing posts. */

export default function PostForm({ post }) {
    //'watch' --> to continuously monitor any field. 'control'--> will be passed to RTE.
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    /*"data" parameter represents the form data submitted when the form is submitted. 
    And how that 'data' is handled after submission is defined here.*/
    const submit = async (data) => {
        if (post) {
            //UPDATE
            //1. Handle file
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                //since we already had post --> delete the previous image file
                appwriteService.deleteFile(post.featuredImage);
            }

            //2. update post
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            //nothing to update --> CREATE a new form
            //1. Handle file 
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;//Just like in MongoDB there is '_id', here it is '$id'.
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
        /*Spreading data ensures that all the relevant form field values are included when updating 
        or creating a post, while allowing you to selectively override or add additional properties 
        as needed. */
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
        /* '^'(caret symbol) --> denotes negate,
        '\d' --> matches digit
        '\s' --> matches whitespace character
        '+' --> aur jitne bhi characters hn negate walon ke alawa unhe replace karega.
        '/g' -->  This flag indicates that the replacement should be done globally, meaning that all 
        occurrences of the pattern in the string should be replaced, not just the first one.
        */
    }, []);

    /*WHY useCallBack() ? 
    Optimizing Performance: When a component renders, any functions defined within 
    it are recreated on every render. If these functions are passed down to child components as props, 
    it can lead to unnecessary re-renders of those child components, even if the function's logic hasn't 
    changed. By using useCallback, you can memoize the function so that it's only recreated if one of its 
    dependencies changes.*/


    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            /*Subscribe to changes in the watch function, which monitors changes in form fields. */
            if (name === "title") {
                /*When the title field changes, it calls the slugTransform function with the new title 
                value to generate a slug.*/
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
                //sets the value of the slug field in the form to the transformed slug value.
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    /*Why subscribe/unsubscribe ? 
    The watch function from react-hook-form is responsible for monitoring changes to form fields.
    So from a high level understanding, what I am essentially doing is I am using 'watch' function 
    to maintain dynamism and keeping that dynamic state in a variable called 'subscription' and in the 
    end I'm unsubscribing from that state.

    If we don't unsubscribe from the subscription when the component unmounts, the subscription may 
    continue to exist in memory even after the component is removed from the DOM. This can lead to memory
    leaks over time --> Memory Leak occurs when a program allocates memory for objects or data structures 
    but fails to release that memory when it is no longer needed. --> decreases the performance
    */

    return (
        //left part --> 2/3 , right part --> 1/3

        /*We are not explicitly writing the statement as 'submit(data)' to pass on the data. But the 
        handleSubmit function that wraps the 'submit' function is doing the job of collecting the 
        'input' fields defined within the form and passing it as data to the submit function */
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">

                {/* Input for Title */}
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />

                {/* Input for Slug */}
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />

                {/* Rich Text Editor for Content --> render RTE*/}
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                {/* Passing control to the RTE component to give it access to the form's state. */}

            </div>
            <div className="w-1/3 px-2">

                {/* Input for Featured Image (File Upload) */}
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />

                {/* Display Existing Featured Image (if editing) */}
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                {/* Select Dropdown for Status */}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />

                {/* Submit Button */}
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

/*Why use register?

The register method in the react-hook-form library is used to bind input fields in a form to the 
form state. --> binding input fields to the form state involves registering each input field with 
the library so that it can track changes to the field values and perform validation as needed.

Syntax--> The register method is typically used as a spread operator (...) on the input field component. 
<input {...register("fieldName", { validationRules })} />

"fieldName": This is a string representing the name of the field. It serves as a unique identifier 
for the input field within the form.
{ validationRules }: Optional validation rules object specifying validation criteria for the field.

register method automates the process by managing the state internally. This makes it easier to 
work with forms, especially in complex scenarios.*/