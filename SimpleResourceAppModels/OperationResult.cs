﻿namespace SimpleResourceAppModels
{
    public class OperationResult
    {
        public bool Success { get; set; }
        public string Message { get; protected set; }

        protected OperationResult() { }

        public void AddToErrorMessage(string message)
        {
            Message += message;
        }

        public static OperationResult Successful()
        {
            return new OperationResult
            {
                Success = true,
                Message = ""
            };
        }

        public static OperationResult Failed(string errorMessage)
        {
            return new OperationResult
            {
                Success = false,
                Message = errorMessage
            };
        }
    }
}
