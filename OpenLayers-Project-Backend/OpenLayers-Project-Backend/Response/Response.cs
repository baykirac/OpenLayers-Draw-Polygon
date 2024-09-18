namespace OpenLayers_Project_Backend.Response
{
    public class Response<T>
    {
        public bool Success { get; set; }
        public T Data { get; set; }
        public string Message { get; set; }
        public List<string> Errors { get; set; }

        public Response()
        {
        }

        public Response(T data, string message = null)
        {
            Success = true;
            Data = data;
            Message = message;
            Errors = null;
        }

        public Response(string message, List<string> errors)
        {
            Success = false;
            Data = default(T);
            Message = message;
            Errors = errors ?? new List<string>();
        }
        public Response(string message, string error)
        {
            Success = false;
            Data = default(T);
            Message = message;
            Errors = new List<string> { error };
        }
    }

}
