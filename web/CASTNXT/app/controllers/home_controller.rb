class HomeController < ApplicationController
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

  def index
    '''
    TODO: Session Redirect
    
    if session.key?(:userEmail) and session.key?(:userType) and session.key?(:userName)
      session_redirect
    end
    '''
  end
  
  def signup
    if new_user?(params[:email])
      create_user(params)
      session[:userEmail] = params[:email]
      session[:userType] = params[:type]
      session[:userName] = params[:name]
      render json: {userType: session[:userType]}, status: 200
    else
      render json: {comment: "Email already exists!"}, status: 400
    end
  end
  
  def login
    if correct_user?(params)
      currentUser = get_user(params[:email], params[:password])
      session[:userEmail] = params[:email]
      session[:userType] = currentUser.user_type
      session[:userName] = currentUser.name
      render json: {userType: session[:userType]}, status: 200
    else
      render json: {comment: "User not found!"}, status: 400
    end
  end
  
  private
  
  def new_user? email
    if Auth.where(:email => email).blank?
      return true
    end
    
    return false
  end
  
  def correct_user? params
    if Auth.where(:email => params[:email], :password => params[:password]).present?
      return true
    end
    
    return false
  end
  
  def get_user email, password
    return Auth.find_by(:email => email, :password => password)
  end
  
  def create_user params
    Auth.create(name:params[:name], email:params[:email], password:params[:password], user_type:params[:type])
  end

  def session_redirect
    if session[:userType] == 'admin'
      redirect_to admins_path
    elsif session[:userType] == 'client'
      redirect_to clients_path
    else
      redirect_to users_path
    end
  end
end