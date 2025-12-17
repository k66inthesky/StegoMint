import requests
import time
import json
import base64

# 這是符合後端驗證邏輯的 Cashu Token 結構
# 我們模擬一個 1000 sats 的 Ecash
def create_cashu_token(amount):
    # 構造內部的 JSON
    token_data = {
        "token": [{
            "mint": "https://mint.mutinynet.com",
            "proofs": [{"amount": amount, "secret": "secret_xyz"}]
        }]
    }
    # 轉成 JSON string
    json_str = json.dumps(token_data)
    # Base64 編碼 (URL Safe)
    b64_str = base64.urlsafe_b64encode(json_str.encode('utf-8')).decode('utf-8')
    # 加上前綴
    return "cashuA" + b64_str

def send_money_to_alice(amount):
    print(f"🇺🇸 Bob is minting {amount} sats Ecash token...")
    
    token = create_cashu_token(amount)
    url = "http://localhost:8000/ecash/receive" # 👈 新的 API 端點
    
    payload = {
        "token": token
    }
    
    try:
        # 模擬網路延遲
        time.sleep(1)
        res = requests.post(url, json=payload)
        
        if res.status_code == 200:
            data = res.json()
            if data.get("status") == "SUCCESS":
                print(f"✅ Sent! Alice confirmed receipt via Nostr.")
            else:
                print(f"❌ Failed: {data}")
        else:
            print(f"❌ Server Error: {res.status_code}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    send_money_to_alice(1000)
    time.sleep(2)
    send_money_to_alice(500)