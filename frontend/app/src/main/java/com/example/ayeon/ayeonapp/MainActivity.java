package com.example.ayeon.ayeonapp;

import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import java.net.URL;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "MainActivity";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button login = (Button)findViewById(R.id.signin);
        Button signup = (Button)findViewById(R.id.signup);

        BtnOnClickListener btnOnClickListener = new BtnOnClickListener();

        login.setOnClickListener(btnOnClickListener);
        signup.setOnClickListener(btnOnClickListener);


    }

    class BtnOnClickListener implements Button.OnClickListener {
        @Override
        public void onClick(View view) {
            switch (view.getId()) {
                case R.id.signin: //로그인
                    new JSONTask().execute("http://localhost:3000/api/user/login");
                    break;

                case R.id.signup: //회원가입
                    new JSONTask().execute("http://localhost:3000/api/auth/register");
                    break;
            }

        }
    }

    class JSONTask extends AsyncTask<String, String, String>{
        protected static void postExecute(){
            Log.d(TAG,"데이터 전송 시작");
        }
        @Override
        protected String doInBackground(String... url){


        }

    }
}
