class UserController < ApplicationController
  def index
    authenticate_user!('user')
    
    
    @properties = {name: session[:userName]}
  end
end
