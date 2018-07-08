class CommentsController < ApplicationController
  def new
    @comment = Comment.new
  end

  def create
    comment = Comment.create!(comment_params)
    comment.images.attach(params[:comment][:images])
    redirect_to comment
  end

  def show
    @comment = Comment.find(params[:id])
  end

  private

  def comment_params
    params.require(:comment).permit(:content)
  end
end
