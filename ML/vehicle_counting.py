import tensorflow as tf

from utils import backbone
from api import object_counting_api

input_video = "./input_images_and_videos/vehicle_survaillance.mp4"
import os 
   
for input_video in os.listdir("./input_images_and_videos/"):
    detection_graph, category_index = backbone.set_model('ssd_mobilenet_v1_coco_2017_11_17')
    fps = 24 # change it with your input video fps
    width = 640 # change it with your input video width
    height = 352 # change it with your input vide height
    is_color_recognition_enabled = 0 # set it to 1 for enabling the color prediction for the detected objects
    roi = 270 # roi line position
    deviation = 3 # the constant that represents the object counting area
    
    object_counting_api.cumulative_object_counting_y_axis("./input_images_and_videos/" + input_video, detection_graph, category_index, is_color_recognition_enabled, fps, width, height, roi, deviation) # counting all the objects
