class ApiController < ApplicationController
  # GET /user
    def index
        talents = Talent.all
        render json:talents
    end
    
    def change_status
        user = Talent.find_by(:_id => params[:id] )
        user.is_active = !user.is_active
        user.is_valid = !user.is_valid
        user.save
        
        auth_user = Auth.find_by(:email => user.email)
        auth_user.is_active = user.is_active
        auth_user.save
        auth_user.is_valid = user.is_valid
        puts auth_user.is_valid
        render json:user
    end
end