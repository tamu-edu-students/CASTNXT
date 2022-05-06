class FormsController < ApplicationController
  
  # GET /forms or /forms.json
  def index
    @forms = Form.all
  end

  # GET /forms/1 or /forms/1.json
  def show
    begin
      if is_user_logged_in?('ADMIN')
        form =  Form.find_by(:_id => params["id"])
        formData = {
          id: form._id.to_str,
          data: form.data
        }
        render json: {formData:  formData}, status: 200
      else
        render json: {redirect_path: '/'}, status: 403
      end
    rescue Exception
      render json: {comment: "Internal Error!"}, status: 500
    end
  end

  # GET /forms/new
  def new
    @form = Form.new
  end

  # GET /forms/1/edit
  def edit
  end

  # POST /forms or /forms.json
  def create
    begin
      if is_user_logged_in?('ADMIN')
        form = Form.create(producer_id:params[:producer_id], data:params[:data])
        render json: {comment: "Form was successfully created!", formId:  form._id.to_str}, status: 201
      else
        render json: {redirect_path: '/'}, status: 403
      end
    rescue Exception
      render json: {comment: "Internal Error!"}, status: 500
    end
  end

  # DELETE /forms/1 or /forms/1.json
  def destroy
    @form.destroy

    respond_to do |format|
      format.html { redirect_to forms_url, notice: "Form was successfully destroyed." }
      format.json { head :no_content }
    end
  end
end
