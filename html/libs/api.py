# -*- coding: utf-8 -*-
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS  # 导入 CORS
import os
import subprocess  # 用于执行系统命令

app = Flask(__name__)
CORS(app)  # 启用 CORS

uuid_file_path = '/root/get_message/UUID'
iata_file_path = '/root/get_message/IATA'

@app.route('/api/get_uuid', methods=['GET'])
def get_uuid():
    try:
        with open(uuid_file_path, 'r') as file:
            uuid = file.read().strip()
        return jsonify({'uuid': uuid})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/update_uuid', methods=['POST'])
def update_uuid():
    data = request.json
    new_uuid = data.get('uuid')
    try:
        with open(uuid_file_path, 'w') as file:
            file.write(new_uuid)
        return jsonify({'message': 'UUID 更新成功!'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/set_location', methods=['POST'])
def set_location():
    data = request.json
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    
    if latitude is None or longitude is None:
        return jsonify({'error': '缺少经纬度参数!'}), 400

    try:
        # 使用 subprocess 执行命令
        command = f"sudo readsb-set-location {latitude} {longitude}"
        subprocess.run(command, shell=True, check=True)
        return jsonify({'message': '位置更新成功!'})
    except subprocess.CalledProcessError as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/get_iata', methods=['GET'])
def get_iata():
    try:
        with open(iata_file_path, 'r') as file:
            iata_code = file.read().strip()
        return jsonify({'iata': iata_code})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/update_iata', methods=['POST'])
def update_iata():
    data = request.json
    new_iata = data.get('iata')
    try:
        with open(iata_file_path, 'w') as file:
            file.write(new_iata)
        return jsonify({'message': 'IATA 更新成功!'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)  # 确保使用 5000 端口